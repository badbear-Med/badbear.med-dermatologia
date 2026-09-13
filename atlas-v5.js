(function(){
  "use strict";

  if (typeof atlasDatos === "undefined") return;

  const CONSULTAS_LESIONES = {
    "Mácula": [
      "vitiligo depigmented patch skin",
      "melasma face skin",
      "pityriasis versicolor trunk skin"
    ],
    "Pápula": [
      "lichen planus papules wrist",
      "molluscum contagiosum papules skin",
      "verruca vulgaris papules hand"
    ],
    "Placa": [
      "plaque psoriasis elbow skin",
      "tinea corporis plaque skin",
      "eczema plaque skin"
    ],
    "Vesícula": [
      "herpes zoster vesicles skin",
      "herpes simplex vesicles skin",
      "dyshidrotic eczema vesicles hand"
    ],
    "Ampolla": [
      "bullous pemphigoid tense blisters skin",
      "pemphigus vulgaris bullae skin",
      "epidermolysis bullosa blister skin"
    ],
    "Pústula": [
      "acne pustules face",
      "folliculitis pustules skin",
      "pustular psoriasis skin"
    ],
    "Nódulo": [
      "erythema nodosum nodules legs",
      "dermatofibroma skin nodule",
      "cutaneous nodule dermatology"
    ],
    "Habón / roncha": [
      "urticaria wheals skin",
      "hives wheals skin"
    ],
    "Escama": [
      "psoriasis scale skin",
      "seborrheic dermatitis scale skin",
      "tinea corporis scale skin"
    ],
    "Costra": [
      "impetigo honey crust skin",
      "crusted eczema skin"
    ],
    "Erosión": [
      "pemphigus vulgaris erosions skin",
      "skin erosion dermatology"
    ],
    "Úlcera": [
      "venous leg ulcer skin",
      "pyoderma gangrenosum ulcer skin",
      "cutaneous ulcer dermatology"
    ],
    "Liquenificación": [
      "lichen simplex chronicus skin",
      "lichenification atopic dermatitis skin"
    ]
  };

  const POSITIVOS_LESIONES = {
    "Mácula": /vitiligo|melasma|versicolor|macule|macular|depigment|hyperpigment|hypopigment/,
    "Pápula": /lichen planus|mollusc|verruca|wart|papule|papular/,
    "Placa": /psoriasis|tinea corporis|eczema|plaque/,
    "Vesícula": /herpes zoster|herpes simplex|dyshidrot|vesicle|vesicular/,
    "Ampolla": /bullous pemphigoid|pemphigus|epidermolysis bullosa|bulla|bullae|blister/,
    "Pústula": /acne|folliculitis|pustular psoriasis|pustule|pustular/,
    "Nódulo": /erythema nodosum|dermatofibroma|cutaneous nodule|skin nodule|nodular/,
    "Habón / roncha": /urticaria|hives|wheal|wheals/,
    "Escama": /psoriasis|seborrheic dermatitis|tinea|scale|scaling|scaly/,
    "Costra": /impetigo|eczema|crust|crusted|honey colored/,
    "Erosión": /pemphigus|erosion|erosions|eroded/,
    "Úlcera": /venous ulcer|pyoderma gangrenosum|cutaneous ulcer|skin ulcer|ulcerated/,
    "Liquenificación": /lichen simplex|lichenification|lichenified|atopic dermatitis/
  };

  const RECHAZAR_GLOBAL = /\b(diagram|drawing|illustration|illustrated|schema|schematic|sketch|cartoon|vector|icon|logo|map|chart|histology|histological|microscopy|microscope|pathology slide|stain|gross specimen|anatomical model|3d render|3d model|cross[- ]section|engraving|painting|sculpture|statue|poster|screenshot|book page|manuscript|x[- ]ray|radiograph|ultrasound|ct scan|mri|food|pizza|dish|recipe|cake|bread|fruit|vegetable|coin|medal|pottery|ceramic|artifact|archaeolog|fossil|rock|stone|mineral|landscape|mountain|building|architecture|monument|road|vehicle|ship|aircraft|wood|fabric|textile|carpet|wallpaper|plant|flower|tree|leaf|animal|dog|cat|bird|fish|insect|spider|shell|mollusk)\b/;

  const RECHAZAR_LESION = /\b(penis|penile|glans|foreskin|circumcision|scrotum|scrotal|vulva|vulvar|vagina|vaginal|genital|genitalia|anus|anal|perianal|oral cavity|palate|hard palate|soft palate|tongue|teeth|tooth|dental|gingiva|buccal mucosa)\b/;

  const estadoPorCard = new WeakMap();
  const usadasEnPantalla = new Set();
  let tabActual = "lesion";
  let busquedaActual = "";
  let io = null;

  function normalizar(texto="") {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function textoPagina(pagina) {
    const info = pagina.imageinfo?.[0] || {};
    const meta = info.extmetadata || {};
    return normalizar([
      pagina.title || "",
      meta.ImageDescription?.value || "",
      meta.ObjectName?.value || "",
      meta.Categories?.value || ""
    ].join(" "));
  }

  function consultasPara(item) {
    if (tabActual === "lesion" && CONSULTAS_LESIONES[item.titulo]) {
      return CONSULTAS_LESIONES[item.titulo];
    }
    return [
      item.busqueda || `${item.titulo} dermatology skin`,
      `${item.titulo} dermatology patient skin`,
      `${item.titulo} clinical skin`
    ];
  }

  function esAceptable(pagina, item) {
    const info = pagina.imageinfo?.[0];
    if (!info) return false;
    if (!/^image\/(jpeg|png|webp)$/i.test(info.mime || "")) return false;
    if ((info.width || 0) < 500 || (info.height || 0) < 350) return false;

    const texto = textoPagina(pagina);
    if (!texto) return false;
    if (RECHAZAR_GLOBAL.test(texto)) return false;

    if (tabActual === "lesion") {
      if (RECHAZAR_LESION.test(texto)) return false;
      const positivo = POSITIVOS_LESIONES[item.titulo];
      if (positivo && !positivo.test(texto)) return false;
    }

    return true;
  }

  function puntuar(pagina, item, consulta) {
    const texto = textoPagina(pagina);
    const titulo = normalizar(pagina.title || "");
    let score = 0;

    const palabras = normalizar(consulta)
      .split(" ")
      .filter(p => p.length >= 4 && !["skin","clinical","patient","dermatology"].includes(p));

    palabras.forEach(p => {
      if (titulo.includes(p)) score += 10;
      if (texto.includes(p)) score += 4;
    });

    if (/clinical|patient|dermat|skin|cutaneous/.test(texto)) score += 4;
    if (/case|rash|eruption|lesion/.test(texto)) score += 2;

    const info = pagina.imageinfo?.[0] || {};
    if ((info.width || 0) >= 900 && (info.height || 0) >= 600) score += 2;

    return score;
  }

  async function consultarCommons(consulta, offset=0) {
    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.searchParams.set("action","query");
    url.searchParams.set("generator","search");
    url.searchParams.set("gsrsearch",`${consulta} filetype:bitmap`);
    url.searchParams.set("gsrnamespace","6");
    url.searchParams.set("gsrlimit","40");
    if (offset > 0) url.searchParams.set("gsroffset",String(offset));
    url.searchParams.set("prop","imageinfo");
    url.searchParams.set("iiprop","url|mime|size|extmetadata");
    url.searchParams.set("iiurlwidth","1200");
    url.searchParams.set("format","json");
    url.searchParams.set("origin","*");

    const r = await fetch(url.toString(),{cache:"no-store"});
    if(!r.ok) throw new Error(`Commons ${r.status}`);
    const data = await r.json();
    return Object.values(data.query?.pages || {});
  }

  async function lote(item, consulta, offset) {
    const paginas = await consultarCommons(consulta, offset);
    const vistos = new Set();
    return paginas
      .filter(p => esAceptable(p,item))
      .map(p => {
        const info = p.imageinfo?.[0] || {};
        return {
          url: info.thumburl || info.url,
          source: info.descriptionurl || "https://commons.wikimedia.org/",
          title: p.title || "Wikimedia Commons",
          score: puntuar(p,item,consulta)
        };
      })
      .filter(x => x.url && !vistos.has(x.url) && vistos.add(x.url))
      .sort((a,b)=>b.score-a.score);
  }

  function cargarURL(img,url) {
    return new Promise((resolve,reject)=>{
      const ok=()=>{limpiar();resolve();};
      const fail=()=>{limpiar();reject(new Error("imagen-no-carga"));};
      const limpiar=()=>{
        img.removeEventListener("load",ok);
        img.removeEventListener("error",fail);
      };
      img.addEventListener("load",ok,{once:true});
      img.addEventListener("error",fail,{once:true});
      img.src=url;
    });
  }

  function tarjetaHTML(item,index) {
    return `
      <article class="atlas-card" data-index="${index}">
        <div class="atlas-imagen-wrap">
          <div class="atlas-loading">Buscando fotografía clínica real…</div>
          <img class="atlas-imagen" alt="Ejemplo clínico de ${item.titulo}" loading="lazy">
          <span class="atlas-real-badge">FOTO REAL · COMMONS</span>
          <button class="atlas-otra" type="button" title="Buscar una fotografía clínica distinta">↻ Otra imagen</button>
        </div>
        <div class="atlas-card-body">
          <div class="atlas-card-top">
            <span class="atlas-tipo">${item.subtitulo}</span>
            <span class="atlas-num">${String(index+1).padStart(2,"0")}</span>
          </div>
          <h3>${item.titulo}</h3>
          <p class="atlas-desc">${item.descripcion}</p>
          <dl class="atlas-datos">
            <div><dt>Morfología clave</dt><dd>${item.morfologia}</dd></div>
            <div><dt>Ejemplos / patrón</dt><dd>${item.ejemplos}</dd></div>
          </dl>
          <div class="atlas-fija"><strong>BADBEAR.MED FIJA:</strong><span>${item.fija}</span></div>
          <a class="atlas-fuente" href="#" target="_blank" rel="noopener noreferrer">Fuente de la fotografía →</a>
        </div>
      </article>`;
  }

  function datosFiltrados() {
    const base = atlasDatos[tabActual] || [];
    const q = normalizar(busquedaActual);
    if(!q) return base;
    return base.filter(item => normalizar([
      item.titulo,item.subtitulo,item.descripcion,item.morfologia,item.ejemplos,item.fija
    ].join(" ")).includes(q));
  }

  async function obtenerSiguiente(card,item,forzarCambio) {
    let st = estadoPorCard.get(card);
    if(!st) {
      st = {consulta:0,offset:0,pool:[],indice:-1,actual:null,historial:new Set()};
      estadoPorCard.set(card,st);
    }

    const consultas = consultasPara(item);

    for(let ronda=0;ronda<12;ronda++) {
      for(let salto=1;salto<=st.pool.length;salto++) {
        const idx=(st.indice+salto+st.pool.length)%st.pool.length;
        const c=st.pool[idx];
        if(!c || c.url===st.actual || st.historial.has(c.url)) continue;
        if(usadasEnPantalla.has(c.url) && st.pool.length>2) continue;
        st.indice=idx;
        return c;
      }

      const consulta = consultas[st.consulta % consultas.length];
      let nuevos=[];
      try { nuevos = await lote(item,consulta,st.offset); } catch(e) { nuevos=[]; }

      const existentes = new Set(st.pool.map(x=>x.url));
      nuevos.forEach(x=>{ if(!existentes.has(x.url)) st.pool.push(x); });

      st.consulta = (st.consulta + 1) % consultas.length;
      if(st.consulta===0) st.offset += 40;

      for(const c of nuevos) {
        if(c.url===st.actual || st.historial.has(c.url)) continue;
        if(usadasEnPantalla.has(c.url) && nuevos.length>2) continue;
        st.indice=st.pool.findIndex(x=>x.url===c.url);
        return c;
      }
    }

    return null;
  }

  async function ponerImagen(card,item,forzarCambio=false) {
    const img=card.querySelector(".atlas-imagen");
    const loading=card.querySelector(".atlas-loading");
    const fuente=card.querySelector(".atlas-fuente");
    const boton=card.querySelector(".atlas-otra");
    if(!img||!loading||!fuente||!boton) return;

    boton.disabled=true;
    loading.style.display="flex";
    loading.textContent=forzarCambio?"Buscando una fotografía clínica distinta…":"Buscando fotografía clínica real…";

    try {
      const st=estadoPorCard.get(card) || {consulta:0,offset:0,pool:[],indice:-1,actual:null,historial:new Set()};
      if(!estadoPorCard.has(card)) estadoPorCard.set(card,st);

      let elegido = await obtenerSiguiente(card,item,forzarCambio);
      let intentos=0;

      while(elegido && intentos<8) {
        try {
          await cargarURL(img,elegido.url);
          break;
        } catch(e) {
          st.historial.add(elegido.url);
          elegido = await obtenerSiguiente(card,item,true);
          intentos++;
        }
      }

      if(!elegido) throw new Error("sin-alternativas-clinicas");

      if(st.actual) usadasEnPantalla.delete(st.actual);
      st.actual=elegido.url;
      st.historial.add(elegido.url);
      usadasEnPantalla.add(elegido.url);

      img.classList.add("cargada");
      img.alt=`${item.titulo} — ${elegido.title.replace(/^File:/i,"")}`;
      fuente.href=elegido.source;
      fuente.textContent="Fuente de la fotografía · Wikimedia Commons →";
      loading.style.display="none";
      boton.textContent="↻ Otra imagen";
    } catch(e) {
      img.removeAttribute("src");
      img.classList.remove("cargada");
      loading.style.display="flex";
      loading.textContent="No se encontró una fotografía clínica suficientemente adecuada con los filtros actuales.";
      fuente.href=`https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent((consultasPara(item)[0]||item.titulo))}`;
      fuente.textContent="Buscar manualmente en Wikimedia Commons →";
      boton.textContent="↻ Reintentar";
    } finally {
      boton.disabled=false;
    }
  }

  function render() {
    if(io) io.disconnect();
    usadasEnPantalla.clear();

    const items=datosFiltrados();
    const grid=document.getElementById("atlas-grid");
    const total=document.getElementById("atlas-total");
    const seccion=document.getElementById("atlas-seccion");
    const vacio=document.getElementById("atlas-vacio");
    if(!grid) return;

    if(total) total.textContent=items.length;
    if(seccion) seccion.textContent=tabActual==="lesion"?"Lesiones elementales":tabActual==="enfermedad"?"Enfermedades":"Patrones de distribución";
    if(vacio) vacio.classList.toggle("oculto",items.length!==0);
    grid.innerHTML=items.map(tarjetaHTML).join("");

    io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const idx=Number(entry.target.dataset.index);
        if(items[idx]) ponerImagen(entry.target,items[idx],false);
      });
    },{rootMargin:"350px 0px"});

    grid.querySelectorAll(".atlas-card").forEach((card,index)=>{
      const item=items[index];
      card.querySelector(".atlas-otra").addEventListener("click",e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        ponerImagen(card,item,true);
      });
      io.observe(card);
    });
  }

  function reemplazarToolbar() {
    const vieja=document.querySelector(".atlas-toolbar");
    if(!vieja) return;
    const nueva=vieja.cloneNode(true);
    vieja.replaceWith(nueva);

    nueva.querySelectorAll(".atlas-tab").forEach(btn=>{
      btn.classList.toggle("activo",btn.dataset.tab===tabActual);
      btn.addEventListener("click",()=>{
        tabActual=btn.dataset.tab;
        busquedaActual="";
        nueva.querySelectorAll(".atlas-tab").forEach(b=>b.classList.toggle("activo",b===btn));
        const input=nueva.querySelector("#atlas-busqueda");
        if(input) input.value="";
        render();
      });
    });

    const input=nueva.querySelector("#atlas-busqueda");
    const limpiar=nueva.querySelector("#atlas-limpiar");
    if(input) input.addEventListener("input",()=>{busquedaActual=input.value;render();});
    if(limpiar) limpiar.addEventListener("click",()=>{busquedaActual="";if(input){input.value="";input.focus();}render();});
  }

  function iniciar() {
    try {
      if(typeof observer!=="undefined" && observer && typeof observer.disconnect==="function") observer.disconnect();
    } catch(e) {}
    reemplazarToolbar();
    render();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar,{once:true});
  else iniciar();
})();