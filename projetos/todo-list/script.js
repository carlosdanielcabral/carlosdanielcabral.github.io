const input = document.getElementById('texto-tarefa');
const botaoAdicionar = document.getElementById('criar-tarefa');
const listaOrdenada = document.getElementById('lista-tarefas');
const botaoRemoverSelecionado = document.getElementById('remover-selecionado');
const botaoApagarTudo = document.getElementById('apaga-tudo');
const botaoRemoverFinalizados = document.getElementById('remover-finalizados');
const botaoSalvarTarefas = document.getElementById('salvar-tarefas');
const tarefasFinalizadas = document.getElementsByClassName('completed');
let tarefas = document.getElementsByTagName('li');

if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i += 1) {
    const li = document.createElement('li');
    const tarefa = JSON.parse(localStorage.getItem(`tarefa-${i + 1}`));
    li.innerText = tarefa.conteudo;
    li.className = tarefa.classe;
    listaOrdenada.appendChild(li);
  }
}

// Retorna o valor contido no campo input#texto-tarefa
function obterTarefaDigitada() {
  return input.value;
}

// Apaga o texto do campor input
function limparInput() {
  input.value = '';
}

// Verifica se há algum elemento selecionado e, se houver, o retorna
function verificarSelecionado() {
  let selecionado = false;

  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].className.indexOf('selecionado') !== -1) {
      selecionado = tarefas[i];
    }
  }

  return selecionado;
}

// Remove a seleção
function removerSelecao(elemento, classe) {
  elemento.classList.remove(classe);
}

function selecionarTarefa() {
  const selecionado = verificarSelecionado();
  if (selecionado !== false) {
    removerSelecao(selecionado, 'selecionado');
  }

  this.className += ' selecionado';
}

// Adiciona a classe completed à tarefa clicada duas vezes
function completarTarefa() {
  if (this.className.indexOf('completed') === -1) {
    this.className = 'completed';
  } else {
    this.classList.remove('completed');
  }
}

// Adiciona o valor digitado no campo input#texto-tarefa no OL como uma LI

function adicionarTarefa() { }

botaoAdicionar.addEventListener('click', () => {
  const tarefa = obterTarefaDigitada();
  const itemDaLista = document.createElement('li');
  itemDaLista.innerText = tarefa;
  itemDaLista.addEventListener('click', selecionarTarefa);
  itemDaLista.addEventListener('dblclick', completarTarefa);
  listaOrdenada.appendChild(itemDaLista);

  limparInput();
});

botaoRemoverSelecionado.addEventListener('click', () => {
  const selecionado = document.querySelector('.selecionado');
  selecionado.remove();
});

botaoApagarTudo.addEventListener('click', () => {
  listaOrdenada.innerHTML = '';
});

botaoSalvarTarefas.addEventListener('click', () => {
  for (let i = 0; i < (listaOrdenada.children.length); i += 1) {
    const tarefa = {
      tarefa: i,
      conteudo: listaOrdenada.children[i].innerText,
      classe: listaOrdenada.children[i].className,
    };

    localStorage.setItem(`tarefa-${i + 1}`, JSON.stringify(tarefa));
  }
});

botaoRemoverFinalizados.addEventListener('click', () => {
  while (tarefasFinalizadas.length > 0) {
    tarefasFinalizadas[tarefasFinalizadas.length - 1].remove();
  }
});

for (let i = 0; i < tarefas.length; i += 1) {
  tarefas[i].addEventListener('click', selecionarTarefa);
}

for (let i = 0; i < tarefas.length; i += 1) {
  tarefas[i].addEventListener('dblclick', completarTarefa);
}
