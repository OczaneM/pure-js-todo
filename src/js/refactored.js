'use strict';

const Todo = {
  //Data members of the todo
  list: document.getElementById('todo-list'),
  allItems: document.getElementsByTagName('li'),
  toggleAll: document.getElementById('toggle-all'),
  remainingItemsText: document.getElementById('todo-length'),
  remainingItemsAmount: 0,


  //Methods of the todo
  init: () => {
    this.toggleAll.state = 'uncomplete'
    this.toggleAll.classList.add('uncomplete')
    this.toggleAll.addEventListener('click', function(event){
      this.toggleAllItems()
    } )
  },

  addItem: (itemText) => {
    this = this.bind(this)

    let item = document.createElement('li')
    item.innerText = itemText

    let removeButton = this.addButton('remove')
    removeButton.addEventListener('click', event => removeItem(item))

    let itemState = this.setItemState(item)

    this.setReorderIcon(item)

    item.appendChild(itemState)
    item.appendChild(removeButton)
    this.list.appendChild(item)
  },

  //Argument must be the type of button to be added in string format
  //Button type must be a pre-existing style class
  addButton: (buttonType) => {
    let newButton = document.createElement('button')
    newButton.innerText = buttonType
    newButton.classList.add(buttonType)
    return newButton
  },

  removeItem: (item) => this.list.removeChild(item),

  setItemState: (item) => {
    this = this.bind(this)

    let itemState = document.createElement('div')
    itemState.innerText = 'uncomplete'
    //itemState will be default uncomplete
    item.classList.add('uncomplete')
    itemState.addEventListener('click', event => checkItemStatus(item))

    return itemState
  },

  setReorderIcon: (item) => {
    //if item is firstchild in Nodelist, set top up-arrow order visibility to null
    //if item is laslchild, set down-arrow visibility to null
    //if item is neither, set both arrows visibility to show
  },

  addToRemainingItems: () => {
    this.remainingItemsAmount++
    this.remainingItemsText.innerText = this.remainingItemsAmount
  },

  removeFromRemainingItems: () => {
    this.remainingItemsAmount--
    this.remainingItemsText.innerText = this.remainingItemsAmount
  },

  checkItemStatus: (item) => {
    if (item.children[0].className === 'uncomplete'){
      this.markAsComplete(item)
      this.strikeTroughItem(item)
    }
    else if (item.children[0].className === 'complete'){
      this.markAsUncomplete(item)
      this.unStrikeItem(item)
    }
  },

  markAsComplete: (item) => {
    if (item.children[0].className === 'uncomplete'){
      item.children[0].innerText = 'complete'
      item.children[0].classList.remove('uncomplete')
      item.children[0].classList.add('complete')
    }
  },

  markAsUncomplete: (item) => {
    if (item.children[0].className === 'complete') {
      item.children[0].innerText = 'uncomplete'
      item.children[0].classList.remove('complete')
      item.children[0].classList.add('uncomplete')
    }
  },

  strikeThroughItem: (item) => {
    //add CSS attribute to strike through item text
  },

  unStrikeItem: (item) => {
    //remove CSS attribute to strike through item text
  }


}
