let plantasEliminadas = 0;
let insetosEliminados = 0;
let monitoramentosAtivos = 0;
const totalMonitoramentos = 5;

// Ativar botões de monitoramento e mostrar detalhes
function ativarInfo(elemento, texto) {
  if (!elemento.classList.contains("ativo")) {
    elemento.classList.add("ativo");
    monitoramentosAtivos++;
    let detalhe = document.createElement("p");
    detalhe.innerText = texto;
    detalhe.style.fontSize = "14px";
    detalhe.style.marginTop = "10px";
    detalhe.style.color = "#0d47a1";
    elemento.appendChild(detalhe);

    // Libera quiz quando todos os botões forem clicados
    if (monitoramentosAtivos === totalMonitoramentos) {
      document.getElementById("quizBtn").disabled = false;
    }
  }
}

// Função para remover insetos das plantas
function matarPlanta(elemento) {
  if (elemento.innerText.includes("Inseto")) {
    elemento.innerText = "🌿 Planta sem inseto";
    elemento.style.background = "#ef9a9a";
    insetosEliminados++;
    atualizarContador();
  }
}

// Atualizar contador
function atualizarContador() {
  document.getElementById("contador").innerText =
    "Plantas eliminadas: " + plantasEliminadas + " | Insetos eliminados: " + insetosEliminados;
}

// ---------------- QUIZ ----------------
const perguntas = [
  { q: "Qual tecnologia ajuda a identificar plantas daninhas com precisão?", op: ["Drone", "Trator comum", "Enxada manual"], correta: "Drone" },
  { q: "O que os mapas geoespaciais oferecem?", op: ["Alta precisão", "Baixa resolução", "Somente imagens coloridas"], correta: "Alta precisão" },
  { q: "Qual prática reduz desperdício de insumos?", op: ["Taxa variável", "Aplicação uniforme", "Uso excessivo"], correta: "Taxa variável" },
  { q: "Insetos e pragas podem ser detectados com:", op: ["Sensores inteligentes", "Lanterna", "Somente visão humana"], correta: "Sensores inteligentes" },
  { q: "A agricultura de precisão utiliza:", op: ["IoT e sensores", "Somente tratores antigos", "Ferramentas manuais"], correta: "IoT e sensores" }
];

let perguntaAtual = 0;
let acertos = 0;

function abrirQuiz() {
  document.getElementById("quiz").style.display = "block";
  document.getElementById("quiz").style.fontSize = "20px"; // deixa maior
  mostrarPergunta();
}

function mostrarPergunta() {
  let p = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = p.q;
  let opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";
  p.op.forEach(opcao => {
    let btn = document.createElement("button");
    btn.innerText = opcao;
    btn.onclick = () => responderQuiz(opcao);
    opcoesDiv.appendChild(btn);
  });
}

function responderQuiz(resposta) {
  let p = perguntas[perguntaAtual];
  let resultado = document.getElementById("resultadoQuiz");

  if (resposta === p.correta) {
    resultado.innerText = "✅ Correto!";
    resultado.style.color = "#2e7d32";
    acertos++;
  } else {
    resultado.innerText = "❌ Errado!";
    resultado.style.color = "#c62828";
  }

  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    setTimeout(mostrarPergunta, 1500);
  } else {
    resultado.innerText = `🎉 Quiz concluído! Você acertou ${acertos} de ${perguntas.length}.`;
    resultado.style.color = "#1e88e5";
  }
}
