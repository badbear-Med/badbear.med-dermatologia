const preguntasReales = [
    {
        id: "001",
        enunciado: "Sobre la estructura de la piel, señale lo incorrecto:",
        opciones: [
            "Embriológicamente se desarrolla del ectodermo y mesodermo",
            "En el segundo trimestre se inicia la queratinización",
            "Consta de 3 capas: epidermis, dermis e hipodermis",
            "Está constituida por 90% por células epidérmicas, dérmicas e hipodérmicas",
            "El estrato espinoso tiene células cuboides"
        ],
        correcta: 3,
        desarrollo:
            "La piel se organiza en epidermis, dermis e hipodermis, pero no puede describirse como si el 90% de toda su constitución correspondiera a células epidérmicas, dérmicas e hipodérmicas. La epidermis está formada principalmente por queratinocitos y contiene también melanocitos, células de Langerhans y células de Merkel. La dermis posee abundante matriz extracelular, colágeno, elastina, fibroblastos, vasos, nervios y anexos; la hipodermis contiene sobre todo tejido adiposo organizado en lobulillos. La composición de la piel, por tanto, no se resume mediante ese porcentaje celular.",
        fija:
            "Epidermis + dermis + hipodermis describen la organización anatómica de la piel; no memorices un supuesto 90% celular como composición normal.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "002",
        enunciado: "Son características de las pápulas, EXCEPTO:",
        opciones: [
            "Pueden ser dermoepidérmicas",
            "Son consistentes",
            "No se hallan en el liquen amiloideo",
            "No dejan cicatriz",
            "Presentación multilocular"
        ],
        correcta: 2,
        desarrollo:
            "La pápula es una lesión sólida, elevada y circunscrita. Puede originarse en epidermis, dermis superficial o en ambas, por lo que algunas son dermoepidérmicas. Su consistencia se aprecia a la palpación y habitualmente, cuando desaparecen sin destrucción profunda del tejido, no dejan cicatriz. El liquen amiloideo sí puede manifestarse con múltiples pápulas pruriginosas que incluso confluyen, de modo que negar la presencia de pápulas en esta entidad es la afirmación incorrecta.",
        fija:
            "Pápula = lesión sólida, elevada y pequeña. El liquen amiloideo sí presenta pápulas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "003",
        enunciado: "En la estructura de la piel, NO se relaciona:",
        opciones: [
            "Neuroectodermo",
            "Peridermo en embrión",
            "Lanugo hasta 5 meses",
            "Células de Langerhans de origen óseo",
            "Hemidesmosomas en capa basal"
        ],
        correcta: 2,
        desarrollo:
            "El desarrollo y la organización de la piel integran varios elementos embrionarios y celulares. El peridermo es una capa transitoria de la epidermis fetal; las células de Langerhans pertenecen al sistema inmunitario cutáneo y derivan de precursores hematopoyéticos; y los hemidesmosomas permiten la adhesión de los queratinocitos basales a la membrana basal. La relación planteada con el lanugo y el límite de cinco meses es la que no corresponde en esta pregunta.",
        fija:
            "Hemidesmosomas → estrato basal. Langerhans → inmunidad cutánea. Lanugo → pelo fetal transitorio.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "004",
        enunciado: "El diagnóstico diferencial de urticaria se realiza con los siguientes, EXCEPTO:",
        opciones: [
            "Dermatitis herpetiforme",
            "Penfigoide ampollar",
            "Dermatitis atópica",
            "Eritema polimorfo",
            "Todos los anteriores"
        ],
        correcta: 4,
        desarrollo:
            "La urticaria se reconoce por habones o ronchas de aparición rápida, pruriginosos y habitualmente transitorios. Diversas dermatosis inflamatorias, pruriginosas o ampollares pueden plantear confusión clínica, especialmente cuando el aspecto inicial no es típico. La clave para separarlas está en la lesión elemental y en su evolución: el habón urticarial es edematoso y fugaz, mientras que las lesiones de otras dermatosis persisten, evolucionan a vesículas o ampollas, descaman o dejan cambios residuales.",
        fija:
            "La lesión elemental típica de la urticaria es la roncha o habón: elevada, edematosa, pruriginosa y fugaz.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "005",
        enunciado: "Diagnóstico diferencial de pénfigo vulgar:",
        opciones: [
            "Psoriasis vulgar",
            "Varicela",
            "Herpes zóster",
            "Todas son ciertas",
            "Ninguna es correcta"
        ],
        correcta: 3,
        desarrollo:
            "El pénfigo vulgar es una dermatosis ampollar caracterizada por ampollas flácidas que se rompen con facilidad y dejan erosiones; el compromiso de mucosas es frecuente y constituye una pista clínica importante. En una pregunta de diagnóstico diferencial, lo esencial es reconocer qué cuadros pueden confundirse por la presencia de vesículas, ampollas, erosiones o lesiones superficiales. La identificación de ampollas flácidas, erosiones extensas y afectación mucosa orienta con mayor fuerza hacia pénfigo vulgar.",
        fija:
            "Pénfigo vulgar → ampolla flácida + erosiones + frecuente compromiso mucoso.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "006",
        enunciado: "Son características de las pápulas:",
        opciones: [
            "Puede ser dermoepidérmico",
            "Son consistentes",
            "Se hallan en liquen amiloideo",
            "No dejan cicatriz",
            "Todas las anteriores"
        ],
        correcta: 4,
        desarrollo:
            "Las pápulas son lesiones elementales sólidas y sobreelevadas. Pueden localizarse en epidermis, dermis superficial o abarcar ambas, de acuerdo con el proceso patológico. Su consistencia se aprecia al tacto y, en ausencia de destrucción profunda, suelen resolverse sin cicatriz. El liquen amiloideo es un ejemplo clínico en el que aparecen múltiples pápulas, por lo que las características propuestas son compatibles con este tipo de lesión.",
        fija:
            "Pápula = sólida + elevada + pequeña + generalmente resolutiva. No la confundas con vesícula, que contiene líquido.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    }
];

let indiceActual = 0;
let seleccionActual = null;
let respondida = false;
let aciertos = 0;
let errores = 0;

const progreso = document.getElementById("real-progreso");
const aciertosEl = document.getElementById("real-aciertos");
const erroresEl = document.getElementById("real-errores");
const idEl = document.getElementById("real-id");
const enunciadoEl = document.getElementById("real-enunciado");
const opcionesEl = document.getElementById("real-opciones");
const confirmarBtn = document.getElementById("real-confirmar");
const siguienteBtn = document.getElementById("real-siguiente");
const alertaEl = document.getElementById("real-alerta");
const resultadoEl = document.getElementById("real-resultado");
const estadoEl = document.getElementById("real-estado");
const desarrolloEl = document.getElementById("real-desarrollo");
const fijaEl = document.getElementById("real-fija");
const imagenWrap = document.getElementById("real-imagen-wrap");
const imagenEl = document.getElementById("real-imagen");
const imagenPieEl = document.getElementById("real-imagen-pie");

function letra(indice) {
    return String.fromCharCode(97 + indice);
}

function renderPregunta() {
    const pregunta = preguntasReales[indiceActual];

    seleccionActual = null;
    respondida = false;

    progreso.textContent = `${indiceActual + 1} / ${preguntasReales.length}`;
    aciertosEl.textContent = aciertos;
    erroresEl.textContent = errores;

    idEl.textContent = `REAL FIJA #${pregunta.id}`;
    enunciadoEl.textContent = pregunta.enunciado;

    opcionesEl.innerHTML = "";
    pregunta.opciones.forEach((texto, i) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "real-opcion";
        boton.innerHTML = `<span class="real-letra">${letra(i)})</span><span>${texto}</span>`;

        boton.addEventListener("click", () => {
            if (respondida) return;

            opcionesEl.querySelectorAll(".real-opcion").forEach(b => {
                b.classList.remove("seleccionada");
            });

            boton.classList.add("seleccionada");
            seleccionActual = i;
            alertaEl.hidden = true;
        });

        opcionesEl.appendChild(boton);
    });

    confirmarBtn.hidden = false;
    siguienteBtn.hidden = true;
    resultadoEl.hidden = true;
    alertaEl.hidden = true;

    imagenWrap.hidden = true;
    imagenEl.removeAttribute("src");
    imagenEl.alt = "";
    imagenPieEl.textContent = "";
}

function confirmarRespuesta() {
    if (respondida) return;

    if (seleccionActual === null) {
        alertaEl.hidden = false;
        return;
    }

    respondida = true;
    const pregunta = preguntasReales[indiceActual];
    const esCorrecta = seleccionActual === pregunta.correcta;

    if (esCorrecta) {
        aciertos += 1;
    } else {
        errores += 1;
    }

    aciertosEl.textContent = aciertos;
    erroresEl.textContent = errores;

    opcionesEl.querySelectorAll(".real-opcion").forEach((boton, i) => {
        boton.disabled = true;
        boton.classList.remove("seleccionada");

        if (i === pregunta.correcta) {
            boton.classList.add("correcta");
        } else if (i === seleccionActual) {
            boton.classList.add("incorrecta");
        }
    });

    estadoEl.className = `real-estado ${esCorrecta ? "estado-ok" : "estado-error"}`;
    estadoEl.innerHTML = esCorrecta
        ? `<strong>Correcto.</strong> Clave: ${letra(pregunta.correcta)}) ${pregunta.opciones[pregunta.correcta]}`
        : `<strong>Incorrecto.</strong> Clave: ${letra(pregunta.correcta)}) ${pregunta.opciones[pregunta.correcta]}`;

    desarrolloEl.textContent = pregunta.desarrollo;
    fijaEl.textContent = pregunta.fija;

    if (pregunta.imagen) {
        imagenEl.src = pregunta.imagen;
        imagenEl.alt = pregunta.imagenAlt || "Imagen de apoyo dermatológico";
        imagenPieEl.textContent = pregunta.imagenPie || "";
        imagenWrap.hidden = false;
    } else {
        imagenWrap.hidden = true;
    }

    resultadoEl.hidden = false;
    confirmarBtn.hidden = true;
    siguienteBtn.hidden = false;

    resultadoEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function siguientePregunta() {
    indiceActual += 1;

    if (indiceActual >= preguntasReales.length) {
        indiceActual = 0;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    renderPregunta();
}

confirmarBtn.addEventListener("click", confirmarRespuesta);
siguienteBtn.addEventListener("click", siguientePregunta);

renderPregunta();