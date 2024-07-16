document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submit-btn");
    let respondeu = false
    // Array de objetos de perguntas e respostas
  const perguntas = [
    {
      pergunta: "Qual a melhor série do mundo?",
      opcoes: ["Young Royale", "Orange is The New Black", "Pretty Little Liers", "Smiley"],
      respostaCorreta: "Orange is The New Black"
    },
    {
      pergunta: "Qual a maior cantora do mundo pop?",
      opcoes: ["Taylor Swift", "Lana Del Rey", "Billie Eilish", "Madona", "Byoncé"],
      respostaCorreta: "Madona"
    },
    {
      pergunta: "Qual o melhor dorama dentre eles?:",
      opcoes:["Apostando Alto", "Vincenzo", "Tudo bem não ser normal", "Diva a Deriva" ],
    respostaCorreta: "Diva a Deriva"
    },
    {
      pergunta: "Simon e Wilhelm devem ficar juntos no final da terceira temporada de Young Royal?",
      opcoes: ["Sim", "Não"],
      respostaCorreta: "Sim"
    },
    {
      pergunta: "Lana Del Rey tem um dos melhores álbuns já  feito?",
      opcoes: ["Sim", "Não"],
      respostaCorreta: "Sim"
    },
    {
      pergunta: "Fisica é abominável?",
      opcoes: ["Sim", "Não"],
      respostaCorreta: "Sim"
    },
  
  ];
  
  
    // exibir as perguntas e opções na interface
    function mostrarPerguntas() {
      let html = "";
      perguntas.forEach(function(p, index) {
        html += `<div id="card-pergunta${index}" class="mb-3">
                          <p>${index + 1}. ${p.pergunta}</p>
                          <div id="opcoes${index}" class="opcoes"></div>
                      </div>`;
      });
      quizContainer.innerHTML = html;
  
      // opções de resposta para cada pergunta
      perguntas.forEach((p, index) => {
        const opcoesContainer = document.getElementById(`opcoes${index}`);
        p.opcoes.forEach((opcao) => {
          opcoesContainer.innerHTML += `<div class="form-check">
                                                  <label class="form-check-label">
                                                    <input class="form-check-input" type="radio" name="pergunta${index}" value="${opcao}">${opcao}
                                                  </label>
                                              </div>`;
        });
      });
    }
    function mostrarAlerta(index, tipo, mensagem) {
      if (index < 0) {
        const cardInfo = document.getElementById(`info`);
        cardInfo.style.display = "block"
        cardInfo.classList.add('alert', `alert-${tipo}`, 'mt-2');
        cardInfo.innerHTML = mensagem
  
      } else {
        const cardPergunta = document.getElementById(`card-pergunta${index}`);
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', `alert-${tipo}`, 'mt-2');
        alertElement.textContent = mensagem;
        cardPergunta.appendChild(alertElement);
      }
    }
  
    // verificar respostas e calcular pontuação
    function verificarRespostas() {
      let pontuacao = 0;
      if (!respondeu) {
        respondeu = true
        perguntas.forEach(function(p, index) {
          const opcaoSelecionada = document.querySelector(`input[name="pergunta${index}"]:checked`);
  
          if (opcaoSelecionada) {
            const respostaUsuario = opcaoSelecionada.value;
            if (respostaUsuario == p.respostaCorreta) {
              pontuacao++;
              // Adiciona alerta de sucesso ao card da pergunta correta
              mostrarAlerta(index, 'success', 'Resposta correta!');
            } else {
              // Adiciona alerta de erro ao card da pergunta incorreta
              mostrarAlerta(index, 'danger', 'Resposta incorreta!');
            }
  
          }
        });
  
        // Adiciona alerta final com a pontuação
        mostrarAlerta(-1, 'info', `Sua pontuação: ${pontuacao}/${perguntas.length} - ${bichos(pontuacao)}`);
      } else {
        mostrarAlerta(-1, 'info', `Sua pontuação: ${pontuacao}/${perguntas.length} - ${bichos(pontuacao)} <br>Usuário já respondeu.`);
      }
  
    }
  
    // Evento de clique no botão de envio
    submitBtn.addEventListener("click", verificarRespostas);
  
    // Inicializa a exibição das perguntas
    mostrarPerguntas();
  });
  
  function bichos(numero) {
    let animals = ['undefined(burro)', '&#x1F417;', '&#x1F40A;', '&#x1F408;', '&#x1F41E;', '&#x1F429;', '&#x1F984;' ];
    return animals[numero];
  }