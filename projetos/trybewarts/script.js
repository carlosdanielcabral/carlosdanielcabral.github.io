const primeiroBotao = document.querySelector('button');
const formPrincipal = document.getElementById('evaluation-form');
const textArea = document.getElementById('textarea');
const contadorDeCaracteres = document.getElementById('counter');
const botaoEnviar = document.getElementById('submit-btn');
const checkboxAgreement = document.getElementById('agreement');
const inputNome = document.getElementById('input-name');
const inputSobrenome = document.getElementById('input-lastname');
const inputEmailFormPrincipal = document.getElementById('input-email');
const inputCasa = document.getElementById('house');

primeiroBotao.addEventListener('click', () => {
  const inputEmail = document.querySelector('input');
  const inputSenha = document.querySelectorAll('input')[1];
  if (inputEmail.value === 'tryber@teste.com' || inputSenha === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

checkboxAgreement.addEventListener('change', () => {
  if (botaoEnviar.disabled) {
    botaoEnviar.disabled = false;
  } else {
    botaoEnviar.disabled = true;
  }
});

textArea.addEventListener('input', () => {
  const numeroDeCaracteres = textArea.textLength;
  contadorDeCaracteres.innerText = 500;
  contadorDeCaracteres.innerText -= numeroDeCaracteres;
});

function obterMateriasSelecionadas() {
  const checkboxConteudos = document.querySelectorAll('.subject:checked');
  let materias = '';
  for (let i = 0; i < checkboxConteudos.length; i += 1) {
    if (i === checkboxConteudos.length) {
      materias += `${checkboxConteudos[i].value}`;
    }
    materias += `${checkboxConteudos[i].value}, `;
  }

  return materias;
}

function mostrarInformacoes(informacoes) {
  const ul = document.createElement('ul');
  const chaves = Object.keys(informacoes);
  const valores = Object.values(informacoes);
  for (let i = 0; i < chaves.length; i += 1) {
    const li = document.createElement('li');
    li.innerText = `${chaves[i]}: ${valores[i]}`;
    ul.appendChild(li);
  }
  formPrincipal.innerHTML = '';
  formPrincipal.appendChild(ul);
}

botaoEnviar.addEventListener('click', (event) => {
  event.preventDefault();
  const inputAvaliacao = document.querySelector('input[name="rate"]:checked');
  const selectFamilia = document.querySelector('input[name="family"]:checked');
  const materias = obterMateriasSelecionadas();
  const informacoes = {
    Nome: `${inputNome.value} ${inputSobrenome.value}`,
    Email: inputEmailFormPrincipal.value,
    Casa: inputCasa.value,
    Família: selectFamilia.value,
    Matérias: materias,
    Avaliação: inputAvaliacao.value,
    Observações: textArea.value,
  };

  mostrarInformacoes(informacoes);
});
