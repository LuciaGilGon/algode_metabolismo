fetch("preguntas.json")
    .then(response => response.json())
    .then(data => {

        const accordion = document.getElementById("accordionTests");

        data.tests.forEach((test, testIndex) => {

            const isOdd = testIndex % 2 === 0;

            let questionsHTML = "";

            test.questions.forEach((q, questionIndex) => {

                let answersHTML = "";

                q.answers.forEach((answer, answerIndex) => {

                    const letras = ["A", "B", "C", "D"];

                    answersHTML += `

                        <div class="form-check mb-3">

                            <input
                                class="form-check-input"
                                type="radio"
                                name="t${testIndex}q${questionIndex}"
                                id="t${testIndex}q${questionIndex}a${answerIndex}"
                                value="${letras[answerIndex]}">

                            <label
                                class="form-check-label"
                                for="t${testIndex}q${questionIndex}a${answerIndex}">

                                ${answer}

                            </label>

                        </div>

                    `;
                });

                questionsHTML += `

                    <h5 class="mt-4">
                        ${questionIndex + 1}. ${q.question}
                    </h5>

                    ${answersHTML}

                    <hr>

                `;
            });

            accordion.innerHTML += `

                <div class="accordion-item custom-accordion">

                    <h2 class="accordion-header" id="heading${testIndex}">

                        <button
                            class="accordion-button collapsed ${isOdd ? "odd-button" : "even-button"}"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#test${testIndex}"
                            aria-expanded="false"
                            aria-controls="test${testIndex}">

                            ${test.title}

                        </button>

                    </h2>

                    <div
                        id="test${testIndex}"
                        class="accordion-collapse collapse"
                        aria-labelledby="heading${testIndex}"
                        data-bs-parent="#accordionTests">

                        <div class="accordion-body text-start">

                            ${questionsHTML}

                            <button
                                class="btn btn-success mt-3"
                                onclick="mostrarResultado(${testIndex})">

                                Ver resultado

                            </button>

                        </div>

                    </div>

                </div>

            `;
        });
    })
    .catch(error => {
        console.error("Error cargando preguntas:", error);
    });

function mostrarResultado(testIndex) {

    const preguntas = document.querySelectorAll(
        `input[name^="t${testIndex}q"]:checked`
    );

    let conteo = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    preguntas.forEach(pregunta => {

        const valor = pregunta.value;

        if (conteo[valor] !== undefined) {
            conteo[valor]++;
        }
    });

    let resultado = "A";

    Object.keys(conteo).forEach(letra => {

        if (conteo[letra] > conteo[resultado]) {
            resultado = letra;
        }
    });

    let resultados = {};

    // TEST 1 → VÍAS METABÓLICAS
    if (testIndex === 0) {

        resultados = {

            A: {
                title: "⚡ Glucólisis",
                description:
                    "Eres una persona rápida, impulsiva y resolutiva. Actúas sin dudar cuando se presenta una situación y eres capaz de generar resultados inmediatos, aunque a veces sin planificación previa. Representas respuestas rápidas ante demandas urgentes, como esta vía metabólica que produce energía de forma casi instantánea."
            },

            B: {
                title: "🔄 Ciclo de Krebs",
                description:
                    "Tu personalidad es analítica, organizada y constante. Te gusta comprender los procesos en profundidad y avanzar paso a paso. Eres el equilibrio entre eficiencia y estabilidad, igual que esta vía central del metabolismo que integra múltiples rutas."
            },

            C: {
                title: "⚡ Fosforilación oxidativa",
                description:
                    "Eres una persona altamente eficiente, orientada a resultados y al máximo rendimiento. Sabes aprovechar al máximo cada recurso disponible. Como esta vía metabólica, produces gran cantidad de energía con precisión y control."
            },

            D: {
                title: "🌱 Gluconeogénesis",
                description:
                    "Eres autosuficiente y resiliente. Cuando no hay recursos disponibles, eres capaz de generarlos por ti mismo/a. Te adaptas a situaciones difíciles y encuentras soluciones donde otros no ven opciones."
            }
        };
    }

    // TEST 2 → RECEPTORES DEL GUSTO
    else if (testIndex === 1) {

        resultados = {

            A: {
                title: "🍭 Receptores T1R2 + T1R3 (El Transportador del Dulce)",
                description:
                    "Tu perfil biológico: Eres un receptor de la familia acoplada a proteínas G. No dejas pasar a cualquiera: necesitas un estímulo muy específico que encaje perfectamente en tu estructura. Evolutivamente, estás diseñado para detectar la energía y el bienestar. Tu personalidad es selectiva, busca la recompensa positiva y activa los circuitos del placer en tu entorno."
            },

            B: {
                title: "🧂 Canales ENaC (El Canal del Salado)",
                description:
                    "Tu perfil biológico: Eres un canal iónico directo y eficiente. No necesitas complejos mecanismos de señalización interna: cuando los iones de sodio aparecen, entran directamente a través de ti, despolarizando la célula de inmediato. Eres vital para el equilibrio osmótico y la supervivencia. Tu personalidad es clara, directa, esencial y mantiene el balance perfecto allá donde vas."
            },

            C: {
                title: "⚡ Canal OTOP1 (El Transportador del Ácido)",
                description:
                    "Tu perfil biológico: Eres un canal de protones especializado y de respuesta ultra rápida. Tu función principal en la evolución es actuar como un sistema de alerta temprana ante alimentos en mal estado o sustancias peligrosas. Tu personalidad es reactiva, eléctrica y perspicaz; saltas al instante ante las anomalías y mantienes a todo el mundo despierto con tu energía crítica."
            },

            D: {
                title: "🍲 Receptores T1R1 + T1R3 (El Transportador del Umami)",
                description:
                    "Tu perfil biológico: Compartes una mitad de tu estructura con el dulce, pero tu combinación está diseñada exclusivamente para detectar el glutamato y los aminoácidos. Eres el receptor del sabor sabroso y sustancioso. Tu personalidad es profunda, madura, da cuerpo a las relaciones y prefiere los estímulos que dejan un retrogusto largo y agradable."
            }
        };
    }

    // TEST 3 → BIOMOLÉCULAS
    else if (testIndex === 2) {

        resultados = {

            A: {
                title: "⚡ Glucosa",
                description:
                    "Eres una biomolécula rápida, sencilla y muy útil, porque representas energía inmediata y una respuesta directa."
            },

            B: {
                title: "🔋 Triglicérido",
                description:
                    "Eres una biomolécula de reserva, estable y protectora, porque tu función principal es almacenar energía para más adelante."
            },

            C: {
                title: "🏗️ Colágeno",
                description:
                    "Eres una biomolécula estructural, resistente y funcional, porque aportas soporte y firmeza a los tejidos."
            },

            D: {
                title: "🧬 ADN / ARN",
                description:
                    "Eres una biomolécula informacional, profunda y esencial, porque guardas y transmites instrucciones para que todo funcione correctamente."
            }
        };
    }

    const accordionBody = document.querySelector(
        `#test${testIndex} .accordion-body`
    );

    accordionBody.innerHTML = `

        <div class="text-center p-4">

            <h2 class="mb-4 text-success">
                ${resultados[resultado].title}
            </h2>

            <p class="fs-5">
                ${resultados[resultado].description}
            </p>

            <button
                class="btn btn-outline-success mt-4"
                onclick="location.reload()">

                Hacer test otra vez

            </button>

        </div>

    `;
}