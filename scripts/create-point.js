function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(dataStates => {

      for (const state of dataStates) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }

    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(dataCities => {

      for (const city of dataCities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })

}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const colletedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  itemLi.classList.toggle("selected")

  const itemId = event.target.dataset.id

  //pegar itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId
  })

  // remover itens da seleção
  if (alreadySelected >= 0) {
    const filterItems = selectedItems.filter(item => {
      return item != itemId
    })

    selectedItems = filterItems
  } else {
    selectedItems.push(itemId)
  }
  
  colletedItems.value = selectedItems
}