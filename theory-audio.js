(function(){
  "use strict";

  if(window.self !== window.top) return;

  const TRACKS = [
    { titulo:"Anatomía y fisiología de la piel", archivo:"audios/01-anatomia-piel.mp3" },
    { titulo:"Lesiones elementales", archivo:"audios/02-lesiones-elementales.mp3" },
    { titulo:"Enfermedades inflamatorias de la piel", archivo:"audios/03-enfermedades-inflamatorias.mp3" },
    { titulo:"Enfermedades parasitarias de la piel", archivo:"audios/04-enfermedades-parasitarias.mp3" },
    { titulo:"Enfermedades bacterianas de la piel", archivo:"audios/05-enfermedades-bacterianas.mp3" },
    { titulo:"Enfermedades virales de la piel", archivo:"audios/06-enfermedades-virales.mp3" }
  ];

  const CLAVE_ESTADO = "badbear_derma_audio_estado";
  const CLAVE_COMPLETADOS = "badbear_derma_audios_completados";

  function leerEstado(){
    try{
      const raw = localStorage.getItem(CLAVE_ESTADO);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  function leerCompletados(){
    try{
      const valor = JSON.parse(localStorage.getItem(CLAVE_COMPLETADOS));
      return Array.isArray(valor) ? valor : [];
    }catch(e){ return []; }
  }

  function formato(segundos){
    if(!Number.isFinite(segundos)) return "0:00";
    const m = Math.floor(segundos / 60);
    const s = Math.floor(segundos % 60).toString().padStart(2,"0");
    return `${m}:${s}`;
  }

  function iniciar(){
    if(document.getElementById("bb-study-audio")) return;

    const estilo = document.createElement("style");
    estilo.textContent = `
      body.bb-study-audio-activo{padding-bottom:118px!important}
      body.bb-study-audio-activo .bb-auth-logout{bottom:126px!important}
      .bb-study-audio{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:99990;width:min(920px,calc(100% - 28px));background:#111827;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:20px;box-shadow:0 18px 55px rgba(17,24,39,.3);padding:12px 14px;font-family:Arial,Helvetica,sans-serif}
      .bb-study-audio-grid{display:grid;grid-template-columns:minmax(180px,1.4fr) auto minmax(180px,1fr) auto;gap:12px;align-items:center}
      .bb-study-meta{min-width:0}.bb-study-kicker{display:block;color:#ffc928;font-size:9px;font-weight:900;letter-spacing:.8px;margin-bottom:3px}.bb-study-title{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:900}.bb-study-sub{display:block;margin-top:3px;color:#aab4c3;font-size:10px}
      .bb-study-controls{display:flex;gap:7px;align-items:center}.bb-study-btn{width:36px;height:36px;border:0;border-radius:50%;display:grid;place-items:center;background:#263244;color:#fff;font-size:14px;cursor:pointer}.bb-study-btn.bb-play{width:42px;height:42px;background:#fff;color:#111827;font-size:17px}
      .bb-study-progress{display:grid;grid-template-columns:auto minmax(90px,1fr) auto;gap:7px;align-items:center;color:#aab4c3;font-size:9px}.bb-study-progress input{width:100%;accent-color:#2458ff}
      .bb-study-options{display:flex;gap:7px;align-items:center}.bb-study-options select{max-width:165px;border:1px solid #364152;border-radius:10px;background:#1f2937;color:#fff;padding:8px 9px;font-size:10px;font-weight:700}.bb-study-speed{max-width:68px!important}
      @media(max-width:760px){
        body.bb-study-audio-activo{padding-bottom:156px!important}
        body.bb-study-audio-activo .bb-auth-logout{bottom:164px!important}
        .bb-study-audio{bottom:8px;width:calc(100% - 16px);padding:10px;border-radius:16px}
        .bb-study-audio-grid{grid-template-columns:1fr auto;gap:8px 10px}
        .bb-study-meta{grid-column:1/2}.bb-study-controls{grid-column:2/3;grid-row:1/2}.bb-study-progress{grid-column:1/-1}.bb-study-options{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) 78px}
        .bb-study-options select{max-width:none;width:100%;padding:7px 8px}.bb-study-title{font-size:12px}.bb-study-sub{display:none}.bb-study-btn{width:32px;height:32px}.bb-study-btn.bb-play{width:38px;height:38px}
      }
    `;
    document.head.appendChild(estilo);

    const contenedor = document.createElement("section");
    contenedor.id = "bb-study-audio";
    contenedor.className = "bb-study-audio";
    contenedor.setAttribute("aria-label","Audio de estudio");
    contenedor.innerHTML = `
      <div class="bb-study-audio-grid">
        <div class="bb-study-meta">
          <span class="bb-study-kicker">🎧 AUDIO DE ESTUDIO</span>
          <strong id="bb-study-title" class="bb-study-title">Anatomía y fisiología de la piel</strong>
          <span class="bb-study-sub">Sigue escuchando mientras navegas por BADBEAR.MED</span>
        </div>
        <div class="bb-study-controls">
          <button id="bb-study-prev" class="bb-study-btn" type="button" aria-label="Audio anterior">◀</button>
          <button id="bb-study-play" class="bb-study-btn bb-play" type="button" aria-label="Reproducir o pausar">▶</button>
          <button id="bb-study-next" class="bb-study-btn" type="button" aria-label="Audio siguiente">▶</button>
        </div>
        <div class="bb-study-progress">
          <span id="bb-study-current">0:00</span>
          <input id="bb-study-range" type="range" min="0" max="100" value="0" aria-label="Progreso del audio">
          <span id="bb-study-total">0:00</span>
        </div>
        <div class="bb-study-options">
          <select id="bb-study-track" aria-label="Tema de audio"></select>
          <select id="bb-study-speed" class="bb-study-speed" aria-label="Velocidad">
            <option value="0.75">0.75x</option><option value="1" selected>1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="1.75">1.75x</option><option value="2">2x</option>
          </select>
        </div>
      </div>
      <audio id="bb-study-media" preload="metadata"></audio>
    `;
    document.body.appendChild(contenedor);
    document.body.classList.add("bb-study-audio-activo");

    const media = document.getElementById("bb-study-media");
    const titulo = document.getElementById("bb-study-title");
    const play = document.getElementById("bb-study-play");
    const prev = document.getElementById("bb-study-prev");
    const next = document.getElementById("bb-study-next");
    const rango = document.getElementById("bb-study-range");
    const actual = document.getElementById("bb-study-current");
    const total = document.getElementById("bb-study-total");
    const selector = document.getElementById("bb-study-track");
    const velocidad = document.getElementById("bb-study-speed");

    TRACKS.forEach((t,i)=>{
      const op = document.createElement("option");
      op.value = String(i);
      op.textContent = `${i+1}. ${t.titulo}`;
      selector.appendChild(op);
    });

    let indice = 0;
    let completados = new Set(leerCompletados());
    let ultimoGuardado = -1;

    function guardar(){
      localStorage.setItem(CLAVE_ESTADO, JSON.stringify({
        indice,
        tiempo: media.currentTime || 0,
        volumen: media.volume,
        velocidad: media.playbackRate
      }));
    }

    function actualizarMediaSession(){
      if(!("mediaSession" in navigator)) return;
      try{
        navigator.mediaSession.metadata = new MediaMetadata({
          title: TRACKS[indice].titulo,
          artist: "BADBEAR.MED · Dermatología",
          album: "Audio de estudio"
        });
      }catch(e){}
    }

    function cargar(nuevoIndice, tiempo=0){
      indice = (nuevoIndice + TRACKS.length) % TRACKS.length;
      const track = TRACKS[indice];
      media.src = track.archivo;
      titulo.textContent = track.titulo;
      selector.value = String(indice);
      play.textContent = "▶";
      actualizarMediaSession();
      if(tiempo > 0){
        media.addEventListener("loadedmetadata",()=>{
          if(tiempo < media.duration) media.currentTime = tiempo;
        },{once:true});
      }
    }

    async function reproducir(){
      try{
        await media.play();
        play.textContent = "❚❚";
      }catch(e){ play.textContent = "▶"; }
    }

    function pausar(){
      media.pause();
      play.textContent = "▶";
      guardar();
    }

    play.addEventListener("click",()=> media.paused ? reproducir() : pausar());
    prev.addEventListener("click",()=>{ guardar(); cargar(indice-1); reproducir(); });
    next.addEventListener("click",()=>{ guardar(); cargar(indice+1); reproducir(); });
    selector.addEventListener("change",()=>{ guardar(); cargar(Number(selector.value)); reproducir(); });
    velocidad.addEventListener("change",()=>{ media.playbackRate = Number(velocidad.value) || 1; guardar(); });
    rango.addEventListener("input",()=>{ if(media.duration) media.currentTime = (Number(rango.value)/100) * media.duration; });

    media.addEventListener("play",()=> play.textContent="❚❚");
    media.addEventListener("pause",()=> play.textContent="▶");
    media.addEventListener("loadedmetadata",()=> total.textContent=formato(media.duration));
    media.addEventListener("timeupdate",()=>{
      actual.textContent = formato(media.currentTime);
      total.textContent = formato(media.duration);
      if(media.duration) rango.value = String((media.currentTime/media.duration)*100);
      const s = Math.floor(media.currentTime);
      if(s > 0 && s % 5 === 0 && s !== ultimoGuardado){ ultimoGuardado = s; guardar(); }
    });

    media.addEventListener("ended",()=>{
      completados.add(indice);
      localStorage.setItem(CLAVE_COMPLETADOS, JSON.stringify([...completados]));
      cargar(indice+1);
      reproducir();
    });

    window.addEventListener("beforeunload",guardar);

    if("mediaSession" in navigator){
      try{
        navigator.mediaSession.setActionHandler("play",reproducir);
        navigator.mediaSession.setActionHandler("pause",pausar);
        navigator.mediaSession.setActionHandler("previoustrack",()=>{cargar(indice-1);reproducir();});
        navigator.mediaSession.setActionHandler("nexttrack",()=>{cargar(indice+1);reproducir();});
      }catch(e){}
    }

    const estado = leerEstado();
    if(estado && Number.isInteger(estado.indice) && TRACKS[estado.indice]){
      indice = estado.indice;
      if(typeof estado.volumen === "number") media.volume = Math.min(1,Math.max(0,estado.volumen));
      if(typeof estado.velocidad === "number"){
        media.playbackRate = estado.velocidad;
        velocidad.value = String(estado.velocidad);
      }
      cargar(indice, Number(estado.tiempo)||0);
    }else cargar(0);
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",iniciar,{once:true});
  else iniciar();
})();