    const carros = {
      carWhite: {
        cor: "Branco",
        elemento: document.getElementById("carWhite"),
        posicao: 20
      },
      carRed: {
        cor: "Vermelho",
        elemento: document.getElementById("carRed"),
        posicao: 20
      }
    };

    let carroSelecionado = null;
    const carSound = document.getElementById("carSound");

    document.getElementById("carWhite").addEventListener("click", () => selecionarCarro("carWhite"));
    document.getElementById("carRed").addEventListener("click", () => selecionarCarro("carRed"));

    function selecionarCarro(id) {
      carroSelecionado = carros[id];
      document.getElementById("selectedColor").innerText = `Carro selecionado: ${carroSelecionado.cor}`;
      carSound.currentTime = 0;
      carSound.play();

       //  Muda a cor de fundo com base na cor do carro
  if (carroSelecionado.cor === "Branco") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black"; // Para manter o texto visível
  } else if (carroSelecionado.cor === "Vermelho") {
    document.body.style.backgroundColor = "red";
    document.body.style.color = "white"; // Texto mais visível em fundo vermelho
  }
    }

function atualizarCarro() {
  if (carroSelecionado) {
    const escala = Math.max(0.3, 1 - carroSelecionado.posicao / 300); 
    carroSelecionado.elemento.style.bottom = carroSelecionado.posicao + "px";
    carroSelecionado.elemento.style.transform = `scale(${escala})`;
  }
}


    function acelerar() {
      if (!carroSelecionado) return;
      carroSelecionado.posicao += 10;
      atualizarCarro();
    }

    function desacelerar() {
      if (!carroSelecionado) return;
      carroSelecionado.posicao = Math.max(0, carroSelecionado.posicao - 10);
      atualizarCarro();
    }

    function resetar() {
      if (!carroSelecionado) return;
      carroSelecionado.posicao = 20;
      atualizarCarro();
      document.getElementById("selectedColor").innerText = "Carro selecionado: ?";
      carroSelecionado = null;

      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") acelerar();
      if (e.key === "ArrowDown") desacelerar();
    });

    let acelerarInterval = null;

const btnAcelerar = document.getElementById("btnAcelerar");
btnAcelerar.addEventListener("mousedown", () => {
  acelerar();
  acelerarInterval = setInterval(acelerar, 100);
});
btnAcelerar.addEventListener("mouseup", () => clearInterval(acelerarInterval));
btnAcelerar.addEventListener("mouseleave", () => clearInterval(acelerarInterval));

const btnDesacelerar = document.getElementById("btnDesacelerar");
btnDesacelerar.addEventListener("mousedown", () => {
  desacelerar();
  acelerarInterval = setInterval(desacelerar, 100);
});
btnDesacelerar.addEventListener("mouseup", () => clearInterval(acelerarInterval));
btnDesacelerar.addEventListener("mouseleave", () => clearInterval(acelerarInterval));

document.getElementById("resetar").addEventListener("click", resetar);