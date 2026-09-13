(function(){
  "use strict";

  if (typeof atlasDatos === "undefined") return;

  try {
    if (typeof observer !== "undefined" && observer && typeof observer.disconnect === "function") {
      observer.disconnect();
    }
  } catch(e) {}

  const consultasClinicas = {
    "Mácula": [
      "vitiligo skin clinical photograph",
      "melasma face clinical photograph",
      "pityriasis versicolor trunk clinical photograph"
    ],
    "Pápula": [
      "lichen planus papules wrist clinical photograph",
      "molluscum contagiosum papules clinical photograph",
      "verruca vulgaris papule hand clinical photograph"
    ],
    "Placa": [
      "plaque psoriasis elbow clinical photograph",
      "tinea corporis plaque clinical photograph",
      "eczema plaque skin clinical photograph"
    ],
    "Vesícula": [
      "herpes zoster vesicles clinical photograph",
      "herpes simplex vesicles skin clinical photograph",
      "dyshidrotic eczema vesicles hand clinical photograph"
    ],
    "Ampolla": [
      "bullous pemphigoid tense blisters clinical photograph",
      "pemphigus vulgaris bullae skin clinical photograph",
      "blister skin clinical photograph"
    ],
    "Pústula": [
      "acne pustules face clinical photograph",
      "folliculitis pustules clinical photograph",
      "pustular psoriasis clinical photograph"
    ],
    "Nódulo": [
      "erythema nodosum nodules legs clinical photograph",
      "cutaneous nodule clinical photograph",
      "dermatofibroma skin nodule clinical photograph"
    ],
    "Habón / roncha": [
      "urticaria wheals clinical photograph",
      "hives skin clinical photograph"
    ],
    "Escama": [
      "psoriasis scale plaque clinical photograph",
      "seborrheic dermatitis scale clinical photograph",
      "tinea corporis scale clinical photograph"
    ],
    "Costra": [
      "impetigo honey colored crust clinical photograph",
      "crusted eczema skin clinical photograph"
    ],
    "Erosión": [
      "pemphigus skin erosions clinical photograph",
      "skin erosion dermatology clinical photograph"
    ],
    "Úlcera": [
      "venous leg ulcer clinical photograph",
      "cutaneous ulcer clinical photograph",
      "pyoderma gangrenosum ulcer clinical photograph"
    ],
    "Liquenificación": [
      "lichenification atopic dermatitis clinical photograph",
      "lichen simplex chronicus clinical photograph"
    ]
  };

  const estadoPorCard = new WeakMap();
  const urlsEnPantalla = new Set();
  let tabActual = "lesion";
  let busquedaActual = "";

  function normalizar(texto="") {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function consultasPara(item) {
    const especiales = consultasClinicas[item.titulo];
    const base = especiales ? [...especiales] : [];
    base.push(item.busqueda || `${item.titulo} dermatology clinical photograph`);
    base.push(`${item.titulo} clinical photograph dermatology`);
    return [...new Set(base.filter(Boolean))];
  }

  function esArchivoClinico(pagina, item) {
    const info = pagina.imageinfo?.[0];
    if (!info) return false;
    if (!/^image\/(jpeg|png|webp)$/i.test(info.mime || "")) return false;
    if ((info.width || 0) < 420 || (info.height || 0) < 280) return false;

    const meta = info.extmetadata || {};
    const texto = normalizar([
      pagina.title || "",
      meta.ImageDescription?.value || "",
      meta.ObjectName?.value || "",
      meta.Categories?.value || ""
    ].join(" "));

    if (/diagram|drawing|illustration|schema|schematic|histolog|microscop|pathology slide|stain|icon|logo|map|chart|anatomical model|3d render|vector/.test(texto)) return false;

    if (tabActual === "lesion" && /penis|penile|vulva|vaginal|scrotum|genitalia/.test(texto)) return false;

    return true;
  }

  function puntuar(pagina, consulta, item) {
    const info = pagina.imageinfo?.[0] || {};
    const meta = info.extmetadata || {};
    const titulo = normalizar(pagina.title || "");
    const descripcion = normalizar(meta.ImageDescription?.value || "");
    const texto = `${titulo} ${descripcion}`;
    const palabras = normalizar(consulta)
      .split(" ")
      .filter(p => p.length >= 4 && !["clinical","photograph","dermatology","skin"].includes(p));

    let score = 0;
    palabras.forEach(p => {
      if (titulo.includes(p)) score += 8;
      if (descripcion.includes(p)) score += 4;
    });

    const tituloItem = normalizar(item.titulo);
    tituloItem.split(" ").filter(p=>p.length>=4).forEach(p=>{
      if (texto.includes(p)) score += 5;
    });

    if (/patient|clinical|skin|dermat|rash|eruption|plaque|papule|vesicle|blister|pustule|ulcer|urticaria|psoriasis|eczema|herpes|acne|vitiligo|melasma/.test(texto)) score += 4;
    if ((info.width || 0) >= 900 && (info.height || 0) >= 600) score += 2;

    return score;
  }

  async function consultarCommons(consulta, offset=0) {
    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.searchParams.set("action", "query");
    url.searchParams.set("generator", "search");
    url.searchParams.set("gsrsearch", `${consulta} filetype:bitmap`);
    url.searchParams.set("gsrnamespace", "6");
    url.searchParams.set("gsrlimit", "30");
    if (offset > 0) url.searchParams.set("gsroffset", String(offset));
    url.searchParams.set("prop", "imageinfo");
    url.searchParams.set("iiprop", "url|mime|size|extmetadata");
    url.searchParams.set("iiurlwidth", "1200");
    url.searchParams.set("format", "json");
    url.searchParams.set("origin", "*");

    const respuesta = await fetch(url.toString(), { cache:"no-store" });
    if (!respuesta.ok) throw new Error(`Commons ${respuesta.status}`);
    const data = await respuesta.json();
    return Object.values(data.query?.pages || {});
  }

  async function construirPool(item, offset=0) {
    const consultas = consultasPara(item);
    const unicos = new Map();

    for (const consulta of consultas) {
      try {
        const paginas = await consultarCommons(consulta, offset);
        paginas.forEach(pagina => {
          if (!esArchivoClinico(pagina, item)) return;
          const info = pagina.imageinfo?.[0];
          const url = info?.thumburl || info?.url;
          if (!url || unicos.has(url)) return;
          unicos.set(url, {
            url,
            source: info.descriptionurl || "https://commons.wikimedia.org/",
            title: pagina.title || "Wikimedia Commons",
            score: puntuar(pagina, consulta, item)
          });
        });
      } catch(e) {}
      if (unicos.size >= 18) break;
    }

    return [...unicos.values()]
      .sort((a,b) => b.score - a.score)
      .slice(0, 24);
  }

  function tarjetaHTML(item, index) {
    return `
      <article class="atlas-card" data-index="${index}">
        <div class="atlas-imagen-wrap">
          <div class="atlas-loading">Buscando fotografía clínica real…</div>
          <img class="atlas-imagen" alt="Ejemplo clínico de ${item.titulo}" loading="lazy">
          <span class="atlas-real-badge">FOTO REAL · COMMONS</span>
          <button class="atlas-otra" type="button" title="Mostrar otra fotografía">↻ Otra imagen</button>
        </div>
        <div class="atlas-card-body">
          <div class="atlas-card-top">
            <span class="atlas-tipo">${item.subtitulo}</span>
            <span class="atlas-num">${String(index + 1).padStart(2,"0")}</span>
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

  function datosFiltradosNuevos() {
    const base = atlasDatos[tabActual] || [];
    const q = normalizar(busquedaActual);
    if (!q) return base;
    return base.filter(item => normalizar([
      item.titulo,item.subtitulo,item.descripcion,item.morfologia,item.ejemplos,item.fija
    ].join(" ")).includes(q));
  }

  async function ponerImagen(card, item, avanzar=false) {
    const img = card.querySelector(".atlas-imagen");
    const loading = card.querySelector(".atlas-loading");
    const fuente = card.querySelector(".atlas-fuente");
    const boton = card.querySelector(".atlas-otra");
    if (!img || !loading || !fuente || !boton) return;

    boton.disabled = true;
    loading.style.display = "flex";
    loading.textContent = avanzar ? "Buscando otra fotografía clínica…" : "Buscando fotografía clínica real…";

    try {
      let estado = estadoPorCard.get(card);
      if (!estado) {
        estado = { pool:[], indice:-1, offset:0, actual:null };
        estadoPorCard.set(card, estado);
      }

      if (!estado.pool.length) {
        estado.pool = await construirPool(item, estado.offset);
      }

      if (avanzar && estado.pool.length <= 1) {
        estado.offset += 30;
        const extra = await construirPool(item, estado.offset);
        const vistos = new Set(estado.pool.map(x=>x.url));
        extra.forEach(x=>{ if(!vistos.has(x.url)) estado.pool.push(x); });
      }

      if (!estado.pool.length) throw new Error("sin-resultados");

      let elegido = null;
      for (let salto=1; salto<=estado.pool.length; salto++) {
        const idx = (estado.indice + salto + estado.pool.length) % estado.pool.length;
        const candidato = estado.pool[idx];
        if (candidato.url === estado.actual) continue;
        if (!urlsEnPantalla.has(candidato.url) || estado.pool.length <= 2) {
          estado.indice = idx;
          elegido = candidato;
          break;
        }
      }

      if (!elegido) {
        estado.offset += 30;
        const extra = await construirPool(item, estado.offset);
        const vistos = new Set(estado.pool.map(x=>x.url));
        extra.forEach(x=>{ if(!vistos.has(x.url)) estado.pool.push(x); });
        elegido = estado.pool.find(x => x.url !== estado.actual && !urlsEnPantalla.has(x.url)) || estado.pool.find(x => x.url !== estado.actual);
        if (elegido) estado.indice = estado.pool.indexOf(elegido);
      }

      if (!elegido) throw new Error("sin-alternativa");

      const anterior = estado.actual;
      if (anterior) urlsEnPantalla.delete(anterior);

      await new Promise((resolve,reject)=>{
        const onload = ()=>{ limpiar(); resolve(); };
        const onerror = ()=>{ limpiar(); reject(new Error("imagen-no-carga")); };
        const limpiar = ()=>{
          img.removeEventListener("load",onload);
          img.removeEventListener("error",onerror);
        };
        img.addEventListener("load",onload,{once:true});
        img.addEventListener("error",onerror,{once:true});
        img.src = elegido.url;
      });

      estado.actual = elegido.url;
      urlsEnPantalla.add(elegido.url);
      img.classList.add("cargada");
      img.alt = `${item.titulo} — ${elegido.title.replace(/^File:/i,"")}`;
      fuente.href = elegido.source;
      fuente.textContent = "Fuente de la fotografía · Wikimedia Commons →";
      loading.style.display = "none";

      boton.textContent = estado.pool.length > 1
        ? `↻ Otra imagen (${estado.indice + 1}/${estado.pool.length})`
        : "↻ Buscar otra imagen";
    } catch(e) {
      img.classList.remove("cargada");
      loading.style.display = "flex";
      loading.textContent = "No encontramos otra fotografía clínica útil. Pulsa nuevamente para reintentar.";
      fuente.href = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(item.busqueda || item.titulo)}`;
      fuente.textContent = "Buscar manualmente en Wikimedia Commons →";
      boton.textContent = "↻ Reintentar";
    } finally {
      boton.disabled = false;
    }
  }

  let io = null;

  function renderNuevo() {
    if (io) io.disconnect();
    urlsEnPantalla.clear();

    const items = datosFiltradosNuevos();
    const seccion = document.getElementById("atlas-seccion");
    const total = document.getElementById("atlas-total");
    const grid = document.getElementById("atlas-grid");
    const vacio = document.getElementById("atlas-vacio");
    if (!grid) return;

    if (seccion) seccion.textContent = tabActual === "lesion" ? "Lesiones elementales" : tabActual === "enfermedad" ? "Enfermedades" : "Patrones de distribución";
    if (total) total.textContent = items.length;
    grid.innerHTML = items.map(tarjetaHTML).join("");
    if (vacio) vacio.classList.toggle("oculto", items.length !== 0);

    io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        io.unobserve(card);
        const index = Number(card.dataset.index);
        const item = items[index];
        if (item) ponerImagen(card,item,false);
      });
    }, { rootMargin:"450px 0px" });

    grid.querySelectorAll(".atlas-card").forEach((card,index)=>{
      const item = items[index];
      const boton = card.querySelector(".atlas-otra");
      boton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        ponerImagen(card,item,true);
      });
      io.observe(card);
    });
  }

  function reemplazarControles() {
    const toolbar = document.querySelector(".atlas-toolbar");
    if (!toolbar) return;
    const clon = toolbar.cloneNode(true);
    toolbar.replaceWith(clon);

    const tabs = clon.querySelectorAll(".atlas-tab");
    tabs.forEach(btn => {
      btn.classList.toggle("activo", btn.dataset.tab === tabActual);
      btn.addEventListener("click",()=>{
        tabActual = btn.dataset.tab;
        busquedaActual = "";
        tabs.forEach(b=>b.classList.toggle("activo",b===btn));
        const input = clon.querySelector("#atlas-busqueda");
        if(input) input.value = "";
        renderNuevo();
      });
    });

    const input = clon.querySelector("#atlas-busqueda");
    const limpiar = clon.querySelector("#atlas-limpiar");
    if (input) input.addEventListener("input",()=>{
      busquedaActual = input.value;
      renderNuevo();
    });
    if (limpiar) limpiar.addEventListener("click",()=>{
      busquedaActual = "";
      if(input){ input.value=""; input.focus(); }
      renderNuevo();
    });
  }

  function iniciar() {
    reemplazarControles();
    renderNuevo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, {once:true});
  } else {
    iniciar();
  }
})();
