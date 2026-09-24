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
    },
    {
        id: "007",
        enunciado: "Diagnósticos diferenciales del lentigo, EXCEPTO:",
        opciones: [
            "Queratosis seborreicas",
            "Efélides",
            "Lentigo maligno",
            "a + c",
            "Ninguno"
        ],
        correcta: 2,
        desarrollo:
            "La pregunta busca distinguir el lentigo simple de lesiones pigmentadas que pueden parecerse clínicamente. En este banco, las efélides y algunas queratosis seborreicas forman parte del razonamiento diferencial, mientras que el lentigo maligno se señala como la alternativa que no corresponde dentro del planteamiento. Para resolverla conviene fijarse en que el examen está preguntando por la excepción, no por una característica positiva del lentigo.",
        fija:
            "En preguntas con EXCEPTO, primero identifica qué entidades sí pertenecen al grupo y luego elimina la que rompe la relación.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "008",
        enunciado: "Se usa en el tratamiento del melasma, EXCEPTO:",
        opciones: [
            "Ácido kójico",
            "Ácido azelaico",
            "Arbutina",
            "Peeling químico",
            "Calcipotriol"
        ],
        correcta: 4,
        desarrollo:
            "El ítem agrupa medidas despigmentantes y procedimientos empleados para reducir la hiperpigmentación del melasma. Ácido kójico, ácido azelaico, arbutina y peelings químicos aparecen dentro de las opciones terapéuticas del planteamiento. El calcipotriol es la alternativa que queda fuera de ese grupo, por lo que corresponde marcarlo como excepción.",
        fija:
            "Melasma: piensa en despigmentantes y procedimientos para hiperpigmentación. Calcipotriol no pertenece a este grupo terapéutico.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "009",
        enunciado: "NO es factor de riesgo para melanoma maligno:",
        opciones: [
            "Lesiones precursoras",
            "Fototipo I y II",
            "Antecedente familiar",
            "Excesiva exposición solar",
            "VPH"
        ],
        correcta: 4,
        desarrollo:
            "La pregunta reúne factores asociados al riesgo de melanoma y pide reconocer el elemento que no pertenece al conjunto. El banco considera como factores relevantes las lesiones precursoras, los fototipos claros, el antecedente familiar y la exposición solar excesiva. El VPH es la alternativa que no se incluye como factor de riesgo en este planteamiento.",
        fija:
            "Melanoma: recuerda fototipo claro + exposición solar + antecedentes familiares + lesiones melanocíticas de riesgo. VPH no forma parte de este grupo.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "010",
        enunciado: "Las variantes del carcinoma espinocelular son:",
        opciones: [
            "Superficial y ulceroso",
            "Nodular y pigmentado",
            "Nodular y vegetante",
            "a + b son correctas",
            "a + c son correctas"
        ],
        correcta: 4,
        desarrollo:
            "El objetivo es reconocer las formas clínicas incluidas en el carcinoma espinocelular dentro del banco. Se consideran las variantes superficial, ulcerosa, nodular y vegetante. Por eso la combinación que reúne las alternativas a y c es la respuesta marcada como correcta.",
        fija:
            "Carcinoma espinocelular: en este banco debes reconocer formas superficial, ulcerosa, nodular y vegetante.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "011",
        enunciado: "En dermatitis atópica del lactante o infante, señale lo correcto:",
        opciones: [
            "Desde los 2–3 meses hasta los 2 años",
            "Placas eritematoescamosas pruriginosas en mejillas",
            "En zonas flexoras en lactantes",
            "Solo a y b son correctas",
            "Todas son correctas"
        ],
        correcta: 3,
        desarrollo:
            "En la forma infantil se consideran correctos el inicio aproximado desde los primeros meses de vida y la presencia de placas eritematoescamosas pruriginosas en las mejillas. El patrón flexural no es el dato que el banco asigna como predominante en el lactante. Por ello, la combinación correcta es la que reúne únicamente las dos primeras afirmaciones.",
        fija:
            "Dermatitis atópica del lactante: inicio precoz + prurito + compromiso facial, especialmente mejillas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "012",
        enunciado: "La escama es lesión elemental de las siguientes entidades, EXCEPTO:",
        opciones: [
            "Psoriasis",
            "Dermatitis seborreica",
            "Liquen",
            "a + c",
            "Ninguna de ellas"
        ],
        correcta: 4,
        desarrollo:
            "La escama corresponde al desprendimiento visible de material córneo en la superficie cutánea. En el planteamiento, psoriasis, dermatitis seborreica y liquen pueden presentar componente descamativo. Como ninguna de esas entidades queda excluida, la alternativa marcada es «Ninguna de ellas».",
        fija:
            "Escama = desprendimiento visible de la capa córnea. Psoriasis y dermatitis seborreica son ejemplos clásicos de dermatosis descamativas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "013",
        enunciado: "La tiña microspórica de la cabeza se caracteriza por:",
        opciones: [
            "Parasitación endotrix",
            "Afectación ectothrix",
            "Placas del mismo tamaño",
            "Placa alopécica",
            "Todas son falsas"
        ],
        correcta: 1,
        desarrollo:
            "La característica que el banco utiliza para identificar la tiña microspórica del cuero cabelludo es el patrón ectothrix. En este tipo de parasitación, la relación del hongo con el tallo piloso permite diferenciarla de patrones endotrix. Esa asociación es la que debe reconocerse rápidamente en el examen.",
        fija:
            "Tiña microspórica del cuero cabelludo → patrón ectothrix.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "014",
        enunciado: "Producen con más frecuencia tiña ungueal, EXCEPTO:",
        opciones: [
            "E. floccosum",
            "T. mentagrophytes",
            "M. canis",
            "T. rubrum",
            "Todas"
        ],
        correcta: 2,
        desarrollo:
            "El ítem diferencia dermatofitos vinculados con compromiso ungueal de uno que se relaciona preferentemente con otras localizaciones. Dentro del banco, Microsporum canis es la excepción y no se considera un agente frecuente de tiña ungueal, a diferencia de los otros dermatofitos listados.",
        fija:
            "Onicomicosis dermatofítica: T. rubrum y T. mentagrophytes son nombres que debes reconocer; M. canis es la excepción de esta pregunta.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "015",
        enunciado: "Término que NO se relaciona con rosácea:",
        opciones: [
            "Stress",
            "Demodex folliculorum",
            "Alimentos calientes",
            "Helicobacter pylori",
            "Ingesta de comida grasa"
        ],
        correcta: 4,
        desarrollo:
            "La pregunta reúne factores y asociaciones que el banco vincula con rosácea. Estrés, Demodex folliculorum, alimentos calientes y Helicobacter pylori aparecen dentro de ese grupo. La ingesta de comida grasa es la alternativa señalada como la que no guarda relación en el planteamiento.",
        fija:
            "Rosácea: recuerda desencadenantes vasomotores y algunas asociaciones microbiológicas; la comida grasa es la excepción de este ítem.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "016",
        enunciado: "En infecciones por VPH señale lo correcto:",
        opciones: [
            "Causan dolor y son estéticas",
            "Siempre hay que tratarlas",
            "Tratamiento de elección: electrocauterio",
            "Condiloma acuminado asociado a VPH de bajo riesgo",
            "Verrugas planas más frecuentes en manos"
        ],
        correcta: 2,
        desarrollo:
            "La clave consignada para esta pregunta es el electrocauterio. Sin embargo, el propio formato del ítem contiene afirmaciones que pueden depender del tipo de lesión, localización y contexto clínico, por lo que no conviene convertir esta clave de examen en una regla terapéutica universal. Para estudio de banco, conserva la respuesta marcada y revisa cada modalidad de VPH por separado cuando estudies tratamiento.",
        fija:
            "Pregunta de banco: clave c). No conviertas «electrocauterio» en una regla universal para todas las lesiones por VPH.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "017",
        enunciado: "Se usan en el tratamiento de psoriasis, EXCEPTO:",
        opciones: [
            "Acitretina",
            "Emolientes",
            "Corticoides sistémicos",
            "Calcipotriol",
            "Metotrexato"
        ],
        correcta: 2,
        desarrollo:
            "La pregunta obliga a separar tratamientos utilizados habitualmente en psoriasis de una opción que no se considera de elección dentro del banco. Acitretina, emolientes, calcipotriol y metotrexato forman parte del manejo en distintos escenarios. Los corticoides sistémicos son la excepción señalada, especialmente por el riesgo de exacerbación o rebote al suspenderlos.",
        fija:
            "Psoriasis: evita fijar corticoides sistémicos como tratamiento habitual; el banco los marca como la excepción.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "018",
        enunciado: "Enfermedad de Nicolás Fabre, señale lo correcto:",
        opciones: [
            "Agente H. Ducreyi",
            "Los ganglios no se abscedan",
            "Se trata con doxiciclina",
            "Agente etiológico corynebacterium → granulomatosis",
            "Es poco contagioso"
        ],
        correcta: 3,
        desarrollo:
            "Esta pregunta presenta una inconsistencia interna en el propio banco: la alternativa marcada como correcta menciona un agente y la explicación asociada al ítem menciona otro. Por seguridad académica, se conserva la clave original para reconocer el examen, pero no debe utilizarse este ítem para memorizar etiología hasta que sea revisado con la teoría del curso.",
        fija:
            "ALERTA DE BANCO: esta pregunta tiene una inconsistencia interna. Memoriza que la clave del examen es d), pero revisa la etiología antes de fijarla como concepto.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "019",
        enunciado: "Sífilis secundaria:",
        opciones: [
            "Lesión fundamental: condiloma acuminado",
            "Se localiza en palmas",
            "Se trata con penicilina sódica",
            "Localización en piel: condiloma plano",
            "Es poco contagioso"
        ],
        correcta: 3,
        desarrollo:
            "La alternativa que el banco identifica como correcta es la presencia de condiloma plano dentro de las manifestaciones cutáneas de la sífilis secundaria. El objetivo de la pregunta es diferenciarlo del condiloma acuminado y reconocer que la fase secundaria posee manifestaciones dermatológicas características.",
        fija:
            "Sífilis secundaria → recuerda el condiloma plano como manifestación cutánea clásica del banco.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "020",
        enunciado: "El carcinoma basocelular se caracteriza por:",
        opciones: [
            "Segundo lugar de cáncer no melanoma",
            "Más frecuente variantes planas",
            "Variante esclerotrófica es más infiltrante",
            "Histología similar a psoriasis"
        ],
        correcta: 2,
        desarrollo:
            "La característica que el banco exige reconocer es el comportamiento infiltrativo de la variante esclerotrófica. Las otras opciones no corresponden al dato distintivo señalado en esta pregunta. En el examen, cuando aparezca la variante esclerotrófica o morfeiforme, debes asociarla con un patrón de crecimiento más infiltrante.",
        fija:
            "Carcinoma basocelular esclerotrófico/morfeiforme → patrón más infiltrante.",
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