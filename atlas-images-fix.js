(function(){
  "use strict";

  /*
    BADBEAR.MED · Atlas visual v3
    - Fuerza fotografías clínicas más relevantes.
    - El botón "Otra imagen" siempre intenta mostrar una fotografía diferente.
    - Intercepta el botón antes del manejador antiguo del atlas.
  */

  const estados = new WeakMap();
  const urlsGlobales = new Set();
  const consultasCache = new Map();

  const BUSQUEDAS_CURADAS = {
    "Mácula": ["vitiligo macules skin clinical", "melasma macules face clinical", "macular rash skin clinical"],
    "Pápula": ["lichen planus papules skin clinical", "molluscum papules skin clinical", "papular eruption skin clinical"],
    "Placa": ["plaque psoriasis skin clinical", "eczema plaque skin clinical", "dermatitis plaque skin clinical"],
    "Vesícula": ["herpes zoster vesicles skin clinical", "herpes simplex vesicles skin clinical", "vesicular eruption skin clinical"],
    "Ampolla": ["bullous pemphigoid blisters skin clinical", "pemphigus bullae skin clinical", "skin blister clinical"],
    "Pústula": ["acne pustules skin clinical", "pustular psoriasis skin clinical", "folliculitis pustules skin clinical"],
    "Nódulo": ["erythema nodosum skin clinical", "cutaneous nodule skin clinical", "skin nodule clinical"],
    "Habón / roncha": ["urticaria wheals skin clinical", "hives wheals skin clinical"],
    "Escama": ["psoriasis scale skin clinical", "scaly plaque skin clinical"],
    "Costra": ["impetigo crust skin clinical", "honey colored crust impetigo clinical"],
    "Erosión": ["pemphigus erosion skin clinical", "skin erosion clinical dermatology"],
    "Úlcera": ["cutaneous ulcer skin clinical", "leg ulcer skin clinical"],
    "Liquenificación": ["lichen simplex chronicus skin clinical", "lichenification atopic dermatitis clinical"]
  };

  const TERMINOS_PROHIBIDOS = /diagram|drawing|illustration|scheme|schematic|histolog|microscop|pathology|stain|svg|icon|logo|chart|map|anatomy illustration|medical illustration|cross section|cross-section/i;
  const TERMINOS_GENERICOS_NO_DESEADOS = /penis|penile|vulva|vulvar|genital|scrotum|scrotal/i;

  function normalizar(s=""){
    return String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]+>/g," ")
      .replace(/[^a-z0-9\s-]/g," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function textoPagina(p){
    const meta = p.imageinfo?.[0]?.extmetadata || {};
    return normalizar([
      p.title || "",
      meta.ImageDescription?.value || "",
      meta.ObjectName?.value || "",
      meta.Categories?.value || ""
    ].join(" "));
  }

  function queriesPara(item){
    const curadas = BUSQUEDAS_CURADAS[item?.titulo] || [];
    const original = String(item?.busqueda || "").trim();
    const titulo = String(item?.titulo || "").trim();
    const subtitulo = String(item?.subtitulo || "").trim();
    return [...new Set([
      ...curadas,
      original,
      `${titulo} dermatology clinical skin`,
      `${titulo} ${subtitulo} clinical photograph`
    ].map(x=>x.replace(/\s+/g," ").trim()).filter(Boolean))];
  }

  function scorePagina(p, query, item){
    const texto = textoPagina(p);
    const titulo = normalizar(p.title || "");
    const q = normalizar(query).split(" ").filter(w=>w.length > 3);
    let score = 0;

    for(const w of q){
      if(titulo.includes(w)) score += 7;
      if(texto.includes(w)) score += 3;
    }

    const itemWords = normalizar(item?.titulo || "").split(" ").filter(w=>w.length > 3);
    for(const w of itemWords){
      if(titulo.includes(w)) score += 10;
      if(texto.includes(w)) score += 5;
    }

    if(/skin|dermat|clinical|patient|rash|eruption|plaque|papule|vesicle|blister|pustule|ulcer|urticaria|psoriasis|herpes|acne|vitiligo|impetigo/.test(texto)) score += 8;
    if(TERMINOS_PROHIBIDOS.test(texto)) score -= 100;

    /* Para lesiones elementales genéricas evitamos que la primera imagen sea genital. */
    if(String(item?.subtitulo || "").toLowerCase().includes("lesión") && TERMINOS_GENERICOS_NO_DESEADOS.test(texto)) score -= 45;

    const info = p.imageinfo?.[0] || {};
    const w = Number(info.width || 0), h = Number(info.height || 0);
    if(w >= 700 && h >= 450) score += 4;
    if(w >= 1200 && h >= 700) score += 3;

    return score;
  }

  async function consultar(query, item, offset=0){
    const clave = `${query}|${offset}|${item?.titulo || ""}`;
    if(consultasCache.has(clave)) return consultasCache.get(clave);

    const promesa = (async()=>{
      const u = new URL("https://commons.wikimedia.org/w/api.php");
      u.searchParams.set("action","query");
      u.searchParams.set("generator","search");
      u.searchParams.set("gsrsearch",query);
      u.searchParams.set("gsrnamespace","6");
      u.searchParams.set("gsrlimit","50");
      if(offset > 0) u.searchParams.set("gsroffset",String(offset));
      u.searchParams.set("prop","imageinfo");
      u.searchParams.set("iiprop","url|mime|size|extmetadata");
      u.searchParams.set("iiurlwidth","1200");
      u.searchParams.set("format","json");
      u.searchParams.set("origin","*");

      const r = await fetch(u.toString(), {cache:"no-store"});
      if(!r.ok) throw new Error("commons-http");
      const data = await r.json();
      const paginas = Object.values(data.query?.pages || {});

      return paginas
        .filter(p=>{
          const i = p.imageinfo?.[0];
          if(!i) return false;
          if(!/^image\/(jpeg|png|webp)$/i.test(i.mime || "")) return false;
          if((i.width || 0) < 350 || (i.height || 0) < 250) return false;
          const txt = textoPagina(p);
          if(TERMINOS_PROHIBIDOS.test(txt)) return false;
          return true;
        })
        .map(p=>({
          url:p.imageinfo[0].thumburl || p.imageinfo[0].url,
          source:p.imageinfo[0].descriptionurl || "https://commons.wikimedia.org/",
          title:p.title || "Wikimedia Commons",
          score:scorePagina(p,query,item)
        }))
        .filter(x=>x.score > -20)
        .sort((a,b)=>b.score-a.score);
    })();

    consultasCache.set(clave,promesa);
    try{return await promesa;}catch(e){consultasCache.delete(clave);throw e;}
  }

  async function buscarConjunto(item, ronda=0){
    const queries = queriesPara(item);
    const vistos = new Set();
    const resultados = [];
    const desplazamiento = ronda * 20;

    for(const q of queries){
      let lista=[];
      try{ lista = await consultar(q,item,desplazamiento); }
      catch(e){
        try{ lista = await consultar(q,item,0); }catch(e2){ lista=[]; }
      }
      for(const x of lista){
        if(!x.url || vistos.has(x.url)) continue;
        vistos.add(x.url);
        resultados.push(x);
      }
      if(resultados.length >= 18) break;
    }
    return resultados.sort((a,b)=>b.score-a.score).slice(0,30);
  }

  function cargarSrc(img,url){
    return new Promise(resolve=>{
      let terminado=false;
      const fin=ok=>{
        if(terminado) return;
        terminado=true;
        img.onload=null;
        img.onerror=null;
        resolve(ok);
      };
      img.onload=()=>fin(true);
      img.onerror=()=>fin(false);
      img.src=url;
      setTimeout(()=>fin(img.complete && img.naturalWidth>0),12000);
    });
  }

  function elegirDiferente(lista, estado, img){
    if(!lista.length) return -1;
    const actual = estado?.urlActual || img?.currentSrc || img?.src || "";

    /* Primero evita tanto la actual como las ya usadas por otras tarjetas. */
    for(let paso=1; paso<=lista.length; paso++){
      const idx=((estado?.indice ?? -1)+paso+lista.length)%lista.length;
      if(lista[idx].url !== actual && !urlsGlobales.has(lista[idx].url)) return idx;
    }
    /* Después solo exige que sea distinta a la actual. */
    for(let paso=1; paso<=lista.length; paso++){
      const idx=((estado?.indice ?? -1)+paso+lista.length)%lista.length;
      if(lista[idx].url !== actual) return idx;
    }
    return 0;
  }

  async function mostrar(card,item,forzarOtra=false){
    if(!card || !item) return;
    const img=card.querySelector(".atlas-imagen");
    const loading=card.querySelector(".atlas-loading");
    const fuente=card.querySelector(".atlas-fuente");
    const boton=card.querySelector(".atlas-otra");
    if(!img || !loading || !fuente) return;

    let estado=estados.get(card) || {lista:[],indice:-1,ronda:0,urlActual:""};
    if(boton) boton.disabled=true;
    loading.style.display="flex";
    loading.textContent=forzarOtra ? "Buscando otra fotografía clínica…" : "Buscando fotografía clínica real…";

    try{
      if(!estado.lista.length){
        estado.lista=await buscarConjunto(item,estado.ronda);
      }

      let idx=elegirDiferente(estado.lista,estado,img);

      /* Si "Otra imagen" no tiene alternativa, busca una página nueva de Commons. */
      if(forzarOtra && (estado.lista.length < 2 || (idx>=0 && estado.lista[idx]?.url===estado.urlActual))){
        estado.ronda += 1;
        const nuevas=await buscarConjunto(item,estado.ronda);
        const conocidas=new Set(estado.lista.map(x=>x.url));
        estado.lista.push(...nuevas.filter(x=>!conocidas.has(x.url)));
        idx=elegirDiferente(estado.lista,estado,img);
      }

      if(idx < 0 || !estado.lista[idx]) throw new Error("sin-imagenes");

      let intentos=0, ok=false, elegida=null;
      while(intentos < estado.lista.length && !ok){
        elegida=estado.lista[idx];
        if(forzarOtra && elegida.url===estado.urlActual){
          idx=(idx+1)%estado.lista.length;
          intentos++;
          continue;
        }
        ok=await cargarSrc(img,elegida.url);
        if(!ok) idx=(idx+1)%estado.lista.length;
        intentos++;
      }

      if(!ok || !elegida) throw new Error("no-cargable");

      estado.indice=idx;
      estado.urlActual=elegida.url;
      estados.set(card,estado);
      urlsGlobales.add(elegida.url);

      img.classList.add("cargada");
      img.alt=`${item.titulo} — ${elegida.title.replace(/^File:/i,"")}`;
      loading.style.display="none";
      fuente.href=elegida.source;
      fuente.textContent="Fuente de la fotografía · Wikimedia Commons →";
    }catch(e){
      loading.style.display="flex";
      loading.textContent="No se encontró una fotografía clínica adecuada. Pulsa ‘Otra imagen’ para volver a buscar.";
      fuente.href=`https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(item.busqueda || item.titulo)}`;
      fuente.textContent="Buscar manualmente en Wikimedia Commons →";
    }finally{
      if(boton) boton.disabled=false;
    }
  }

  function itemDeCard(card){
    try{
      const items = typeof datosFiltrados === "function" ? datosFiltrados() : [];
      const index = Number(card.dataset.index);
      return items[index] || null;
    }catch(e){ return null; }
  }

  /* Intercepta ANTES del listener antiguo para que el botón sí cambie la imagen. */
  document.addEventListener("click",function(ev){
    const boton=ev.target.closest?.(".atlas-otra");
    if(!boton) return;
    const card=boton.closest(".atlas-card");
    const item=itemDeCard(card);
    if(!card || !item) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    mostrar(card,item,true);
  },true);

  /* Cuando el atlas renderiza tarjetas nuevas, las sustituye por nuestra carga curada. */
  const observadorDOM=new MutationObserver(()=>{
    document.querySelectorAll(".atlas-card").forEach(card=>{
      if(card.dataset.bbV3 === "1") return;
      card.dataset.bbV3="1";
      const item=itemDeCard(card);
      if(item) setTimeout(()=>mostrar(card,item,false),50+Number(card.dataset.index||0)*70);
    });
  });

  function arrancar(){
    const grid=document.getElementById("atlas-grid");
    if(!grid) return;
    observadorDOM.observe(grid,{childList:true,subtree:false});
    document.querySelectorAll(".atlas-card").forEach(card=>{
      if(card.dataset.bbV3 === "1") return;
      card.dataset.bbV3="1";
      const item=itemDeCard(card);
      if(item) mostrar(card,item,false);
    });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",arrancar,{once:true});
  else arrancar();
})();
