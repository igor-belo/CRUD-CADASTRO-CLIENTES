const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCPF = document.querySelector('#m-cpf')
const sIdade = document.querySelector('#m-idade')
const sNumero = document.querySelector('#m-numero')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCPF.value = itens[index].CPF
    sIdade.value = itens[index].idade
    sNumero.value = itens[index].numero
    id = index
  } else {
    sNome.value = ''
    sCPF.value = ''
    sIdade.value = ''
    sNumero.value = ''
  }
  
}

function editItem(index) {
  console.log(index)
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.CPF}</td>
    <td>${item.idade}</td>
    <td>${item.numero}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCPF.value == '' ||  sIdade.value == '' || sNumero.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].CPF = sCPF.value
    itens[id].funcao = sIdade.value
    itens[id].salario = sNumero.value
  } else {
    itens.push({'nome': sNome.value, 'CPF': sCPF.value, 'idade': sIdade.value, 'Numero': sNumero.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()