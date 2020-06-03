function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        
        for( const state of states ) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }

    } )

}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    
   
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {


        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

        for( const city of cities ) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}





document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




//Items de coleta

//pegar todos os li's

const ItemsToCollect = document.querySelectorAll(".items-grid li")


for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
 
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    // add or remove a class with js
    const itemLi = event.target
    
    
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

   
    
    //verificar se existem items selecionados, se sim
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })
    
    //if already selecte take it off from the selection
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter (item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }


    
    //else add to the selection

    //update the input hidden with the selected items

    collectedItems.value = selectedItems

}
    
