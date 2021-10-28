const body = document.querySelector('body');
const cores = document.getElementsByClassName('color');
const boardSize = document.getElementById('board-size');
const botaoGeradorDePixels = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');
const botaoLimpar = document.getElementById('clear-board');
let altura = window.innerHeight;
let largura = window.innerWidth;
const coresArray = ['metallic-seaweed', 'fire-opal', 'turquoise-green', 'flax', 'rose-madder', 'lilac-luster', 'terra-cotta'];
let indexArray = [];
let tamanho = 5;
let pixel = '';

body.style.backgroundSize = `${largura}px ${altura}px`;

window.addEventListener('resize', () => {
  altura = window.innerHeight;
  largura = window.innerWidth;
  body.style.backgroundSize = `${largura}px ${altura}px`;
});

function sortearIndices() {
  while (indexArray.length < 4) {
    let numero = Math.floor(Math.random() * (coresArray.length - 1));
    if (indexArray.indexOf(numero) === -1) {
      indexArray.push(numero);
    }
  }
}

console.log(sortearIndices())
// Cria uma div com a classe pixel
function criarPixels() {
  const div = document.createElement('div');
  div.className = 'pixel';
  return div;
}

// Remove os filhos do elemento
function removerFilhos(elemento) {
  const filho = elemento;
  filho.innerHTML = '';
}

// Cria e adiciona os pixels ao pixelBoard
function preencherPixelBoard() {
  for (let i = 0; i < tamanho; i += 1) {
    for (let n = 0; n < tamanho; n += 1) {
      const div = criarPixels();
      pixelBoard.appendChild(div);
    }
  }
  pixel = document.getElementsByClassName('pixel');
}

// Altera o width do elemento passado como parametro
function alterarTamanhoElemento(elemento, valor) {
  const element = elemento;
  element.style.width = `${valor}px`;
}

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

// Retorno a div de cor que está selecionada
function retornarElementoSelecionado() {
  let elemento;
  for (let i = 0; i < cores.length; i += 1) {
    const selected = cores[i].className.indexOf('selected');
    if (selected !== -1) {
      elemento = cores[i];
    }
  }
  return elemento;
}

// Remove a classe selected do elemento que a possui
function removerSelecao() {
  for (let i = 0; i < cores.length; i += 1) {
    const selected = cores[i].className.indexOf('selected');
    if (selected !== -1) {
      cores[i].classList.remove('selected');
    }
  }
}

// Adiciona a classe selected ao elemento
function adicionarSelecao(event) {
  const selecionado = retornarElementoSelecionado();
  const elemento = event.target;
  if (selecionado !== elemento) {
    removerSelecao();
    elemento.className += ' selected';
  }
}

// Adiciona um listener ao elemento passado como parametro, com a funcao passada como parametro
function addListener(elemento, funcao) {
  for (let i = 0; i < elemento.length; i += 1) {
    elemento[i].addEventListener('click', funcao);
  }
}

botaoLimpar.addEventListener('click', () => {
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].className = 'pixel';
  }
});

// Adiciona a classe selecionada à div
function pintarPixel(event) {
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
}

criarPixels();
preencherPixelBoard();
addListener(cores, adicionarSelecao);
addListener(pixel, pintarPixel);
