const cores = document.getElementsByClassName('color');
const boardSize = document.getElementById('board-size');
const botaoGeradorDePixels = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');
const botaoLimpar = document.getElementById('clear-board');

let tamanho = 5;
let pixel;

// Gera as cores da paleta - exceto a primeira, preta - aleatoriamente ao carregar a página
const gerarCoresRandomicas = () => {
  const coresArray = ['metallic-seaweed', 'fire-opal', 'turquoise-green', 'flax', 'rose', 'terra'];
  const indexArray = [];

  while (indexArray.length < 3) {
    const numeroAleatorio = Math.floor(Math.random() * 5);
    if (!indexArray.includes(numeroAleatorio)) indexArray.push(numeroAleatorio);
  }

  for (let i = 0; i < 3; i += 1) {
    cores[i + 1].className = `color ${coresArray[indexArray[i]]}`;
  }
};

// Cria uma div com a classe pixel
const criarPixels = () => {
  const div = document.createElement('div');
  div.className = 'pixel';
  return div;
};

// Remove os filhos do elemento
const removerFilhos = (elemento) => {
  const filho = elemento;
  filho.innerHTML = '';
};

// Cria e adiciona os pixels ao pixelBoard
const preencherPixelBoard = () => {
  for (let i = 0; i < tamanho; i += 1) {
    for (let n = 0; n < tamanho; n += 1) {
      const div = criarPixels();
      pixelBoard.appendChild(div);
    }
  }
  pixel = document.getElementsByClassName('pixel');
};

// Altera o width do elemento passado como parametro
const alterarTamanhoElemento = (elemento, valor) => {
  const element = elemento;
  element.style.width = `${valor}px`;
};

// Adiciona um listener ao elemento passado como parametro, com a funcao passada como parametro
const addListener = (elemento, funcao) => {
  for (let i = 0; i < elemento.length; i += 1) {
    elemento[i].addEventListener('click', funcao);
  }
};

// Retorno a div de cor que está selecionada
const retornarElementoSelecionado = () => {
  let elemento;
  for (let i = 0; i < cores.length; i += 1) {
    const selected = cores[i].className.indexOf('selected');
    if (selected !== -1) {
      elemento = cores[i];
    }
  }
  return elemento;
};

// Adiciona a classe da cor selecionada ao pixel clicado
const pintarPixel = (event) => {
  const classesDaDiv = retornarElementoSelecionado().className.split(' ');
  const pixelClicado = event.target;

  const classesDoPixelClicado = pixelClicado.className.split(' ');

  if (classesDoPixelClicado.length > 1) {
    const corAtual = classesDoPixelClicado[1];
    pixelClicado.classList.remove(corAtual);
  }

  const corSelecionada = classesDaDiv[1];
  pixelClicado.className += ` ${corSelecionada}`;
  console.log(pixelClicado);
};

// Remove os pixels do quadro e o preenche de acordo com o tamanho digitado pelo usuário
botaoGeradorDePixels.addEventListener('click', () => {
  tamanho = parseInt((boardSize.value), 10);
  if (!(Number.isInteger(tamanho))) {
    alert('Board inválido!');
    tamanho = 5;
  }

  if (tamanho < 5) {
    tamanho = 5;
  } else if (tamanho > 50) {
    tamanho = 50;
  }

  removerFilhos(pixelBoard);
  alterarTamanhoElemento(pixelBoard, (42 * tamanho));
  preencherPixelBoard();
  addListener(pixel, pintarPixel);
});

// Remove a classe selected do elemento que a possui
const removerSelecao = () => {
  for (let i = 0; i < cores.length; i += 1) {
    const selected = cores[i].className.indexOf('selected');
    if (selected !== -1) {
      cores[i].classList.remove('selected');
    }
  }
};

// Adiciona a classe selected ao elemento
const adicionarSelecao = (event) => {
  const selecionado = retornarElementoSelecionado();
  const elemento = event.target;
  if (selecionado !== elemento) {
    removerSelecao();
    elemento.className += ' selected';
  }
};

// Remove as cores dos pixels
botaoLimpar.addEventListener('click', () => {
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].className = 'pixel';
  }
});

// Chama as funções necessárias para o funcionamento do programa ao carregar a página
window.onload = () => {
  gerarCoresRandomicas();
  criarPixels();
  preencherPixelBoard();
  addListener(cores, adicionarSelecao);
  addListener(pixel, pintarPixel);
};
