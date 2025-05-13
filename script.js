
const phases = [
  {
    title: "Fase 1: Emoção e Intimidade",
    summary: "Explora a base emocional da relação: confiança, ternura, e ligação emocional.",
    questions: [
      {
        question: "O que mais valorizas num momento íntimo?",
        answers: [
          { text: "Conexão emocional", value: "emoção" },
          { text: "Exploração do corpo", value: "físico" },
          { text: "Sentir-me desejada(o)", value: "emoção" },
          { text: "Entregar-me plenamente", value: "emoção" },
          { text: "Controlar a situação", value: "físico" }
        ]
      },
      {
        question: "Gostarias de experimentar algo novo com o teu parceiro?",
        answers: [
          { text: "Sim, com confiança", value: "abertura" },
          { text: "Prefiro manter o que já conhecemos", value: "segurança" },
          { text: "Depende da proposta", value: "abertura" },
          { text: "Preciso de tempo", value: "segurança" },
          { text: "Só se for emocionalmente seguro", value: "emoção" }
        ]
      }
    ]
  }
];

let currentPhase = 0;
let currentQuestion = 0;
let results = [];

const introEl = document.getElementById("intro");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const phaseTitleEl = document.getElementById("phase-title");
const phaseSummaryEl = document.getElementById("phase-summary");
const summaryContainer = document.getElementById("summary-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");

startBtn.addEventListener("click", () => {
  introEl.classList.add("hidden");
  quizEl.classList.remove ("hidden");
  showquestion();
});

function showPhaseSummary() {
  const phase = phases[currentPhase];
  phaseTitleEl.textContent = phase.title;
  phaseSummaryEl.textContent = phase.summary;
  summaryContainer.classList.remove("hidden");
  setTimeout(() => {
    summaryContainer.classList.add("hidden");
    showQuestion();
  }, 3000);
}

function showQuestion() {
  const phase = phases[currentPhase];
  const q = phase.questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => {
      results.push(answer.value);
      currentQuestion++;
      if (currentQuestion < phase.questions.length) {
        showQuestion();
      } else {
        currentPhase++;
        currentQuestion = 0;
        if (currentPhase < phases.length) {
          showPhaseSummary();
        } else {
          showResult();
        }
      }
    };
    answersEl.appendChild(btn);
  });
}

function showResult() {
  quizContainer.classList.add("hidden");

  const emotion = results.filter(r => r === "emoção").length;
  const fisico = results.filter(r => r === "físico").length;
  const abertura = results.filter(r => r === "abertura").length;
  const seguranca = results.filter(r => r === "segurança").length;

  let resumo = "Resumo psicológico:

";

  resumo += emotion > fisico
    ? "- Procuras ligação emocional e afetiva.
"
    : "- O toque e o prazer físico são importantes para ti.
";

  resumo += abertura > seguranca
    ? "- Estás aberta(o) a novas experiências.
"
    : "- Preferes manter a segurança e o conhecido.
";

  resumo += "
Obrigado pelo teu tempo e pela tua entrega. Que esta partilha aprofunde ainda mais a vossa conexão.";

  resultEl.textContent = resumo;
  resultEl.classList.remove("hidden");
}
