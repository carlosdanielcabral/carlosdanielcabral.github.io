const input = document.getElementById('texto-tarefa');
const addButton = document.getElementById('criar-tarefa');
const ordenedList = document.getElementById('lista-tarefas');
const removeSelectedButton = document.getElementById('remover-selecionado');
const removeAllButton = document.getElementById('apaga-tudo');
const removeCompletedButton = document.getElementById('remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');
// const moveUpButton = document.getElementById('mover-cima');
// const moveDownButton = document.getElementById('mover-baixo');
const tarefasFinalizadas = document.getElementsByClassName('completed');
const tarefas = document.getElementsByTagName('li');
const tarefasSalvas = localStorage.getItem('to-do-list') !== null && localStorage.getItem('to-do-list') !== '' ? JSON.parse(localStorage.getItem('to-do-list')) : [];

// Verifica se há alguma tarefa salva no localStorage e, se houver, adiciona em uma li à ol.
if (tarefasSalvas.length > 0) {
  tarefasSalvas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.innerText = tarefa.tarefa;
    li.className = tarefa.class;
    ordenedList.appendChild(li);
  })
}

// Retorna o valor contido no campo input#texto-tarefa
function getInputValue() {
  return input.value;
}

// Apaga o texto do campor input
function clearInput() {
  input.value = '';
}

// Verifica se há algum elemento selecionado e, se houver, o retorna
function verificarSelecionado() {
  let selected = false;
  Array.from(tarefas).forEach((tarefa) => {
    if (tarefa.className.includes('selecionado')) {
      selected = tarefa;
    } 
  })

  return selected;
}

// Remove a seleção
function removeSelected(elemento, classe) {
  elemento.classList.remove(classe);
}

// Seleciona a tarefa
function selecionarTarefa() {
  const selecionado = verificarSelecionado();
  if (selecionado) {
    removeSelected(selecionado, 'selecionado');
  }

  this.className += ' selecionado';
}

// Adiciona a classe completed à tarefa clicada duas vezes
function completarTarefa() {
  this.classList.toggle('completed');
}

// Adiciona o valor digitado no campo input#texto-tarefa no OL como uma LI
addButton.addEventListener('click', () => {
  const tarefa = getInputValue();
  const itemDaLista = document.createElement('li');
  itemDaLista.innerText = tarefa;
  itemDaLista.addEventListener('click', selecionarTarefa);
  itemDaLista.addEventListener('dblclick', completarTarefa);
  ordenedList.appendChild(itemDaLista);

  clearInput();
});

// Em um clique no botao o elemento selecionado é removido
removeSelectedButton.addEventListener('click', () => {
  const selecionado = document.querySelector('.selecionado');
  selecionado.remove();
  tarefasSalvas.forEach((tarefa) => {
    if (tarefa.tarefa === selecionado.innerText) {
      tarefasSalvas.splice(tarefasSalvas.indexOf(tarefa), 1);
      localStorage.setItem('to-do-list', tarefasSalvas);
    }
  });
});

// Em um clique no botão todas as li's são apagadas
removeAllButton.addEventListener('click', () => {
  ordenedList.innerHTML = '';
});

// Em um clique no botão as tarefas são salvas no localStorage
saveButton.addEventListener('click', () => {
  Array.from(ordenedList.children).forEach((li) => {
    const tarefa = {
      tarefa: li.innerText,
      class: li.className,
    };

    if (!tarefasSalvas.some((t) => t.tarefa === tarefa.tarefa)) {
      tarefasSalvas.push(tarefa); 
      localStorage.setItem('to-do-list', JSON.stringify(tarefasSalvas));
    }
  })
});

// Em um clique no botão os elementos finalizados (com a classe completed) são removidos
removeCompletedButton.addEventListener('click', () => {
  while (tarefasFinalizadas.length > 0) {
    tarefasFinalizadas[tarefasFinalizadas.length - 1].remove();
  }
});

// // Em um clique no botão o elemento selecionado é movido para cima
// moveUpButton.addEventListener('click', () => {
//   const selecionado = verificarSelecionado();
//   if (selecionado) {
//     const elementoAnterior = selecionado.previousElementSibling;
//     if (elementoAnterior !== null) {
//       elementoAnterior.insertAdjacentElement('beforebegin', selecionado);
//     }
//   }
// });

// // Em um clique no botão o elemento selecionado é movido para baixo
// moveDownButton.addEventListener('click', () => {
//   const selecionado = verificarSelecionado();
//   if (selecionado) {
//     const elementoSeguinte = selecionado.nextElementSibling;
//     if (elementoSeguinte !== null) {
//       elementoSeguinte.insertAdjacentElement('afterend', selecionado);
//     }
//   }
// });

// Adiciona a todas as tarefas que já estão na OL quando a página carrega o escutador
for (let i = 0; i < tarefas.length; i += 1) {
  tarefas[i].addEventListener('click', selecionarTarefa);
}

for (let i = 0; i < tarefas.length; i += 1) {
  tarefas[i].addEventListener('dblclick', completarTarefa);
}
