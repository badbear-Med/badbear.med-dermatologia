/* =========================================================
   BADBEAR.MED · CATÁLOGO CENTRAL DE DERMATOLOGÍA
   Única fuente para temas, audios, videos y teoría.

   Para agregar material nuevo:
   1) Sube el MP3 a /audios/
   2) Coloca su ruta en la propiedad audio del tema.
   3) Coloca el enlace individual de YouTube en video cuando exista.
   4) El reproductor y la página Audio se actualizan automáticamente.
========================================================= */

(function(){
  "use strict";

  const PLAYLIST = "https://www.youtube.com/playlist?list=PLBeP1w0B3Wqc";

  const temas = [
    {
      id:1,
      titulo:"Anatomía y fisiología de la piel",
      audio:"audios/01-anatomia-piel.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:2,
      titulo:"Lesiones elementales",
      audio:"audios/02-lesiones-elementales.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:3,
      titulo:"Enfermedades inflamatorias de la piel",
      audio:"audios/03-enfermedades-inflamatorias.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:4,
      titulo:"Enfermedades parasitarias de la piel",
      audio:"audios/04-enfermedades-parasitarias.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:5,
      titulo:"Enfermedades bacterianas de la piel",
      audio:"audios/05-enfermedades-bacterianas.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:6,
      titulo:"Enfermedades virales de la piel",
      audio:"audios/06-enfermedades-virales.mp3",
      video:null,
      teoria:"teoria.html",
      estado:"disponible"
    },
    { id:7,  titulo:"Tema 07 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:8,  titulo:"Tema 08 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:9,  titulo:"Tema 09 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:10, titulo:"Tema 10 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:11, titulo:"Tema 11 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:12, titulo:"Tema 12 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:13, titulo:"Tema 13 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:14, titulo:"Tema 14 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:15, titulo:"Tema 15 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" },
    { id:16, titulo:"Tema 16 · pendiente de definir", audio:null, video:null, teoria:"teoria.html", estado:"pendiente" }
  ];

  window.BADBEAR_DERMATOLOGIA = Object.freeze({
    totalTemas:16,
    playlistYouTube:PLAYLIST,
    temas:Object.freeze(temas.map(t=>Object.freeze({...t})))
  });
})();
