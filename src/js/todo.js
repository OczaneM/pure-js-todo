'use strict';

const Todo = {
  //Data members of the todo
  list: document.getElementById('todo-list'),
  allItems: document.getElementsByTagName('li'),
  toggleAll: document.getElementById('toggle-all'),
  remainingItemsText: document.getElementById('todo-length'),
  remainingItemsAmount: 0,


  //Methods of the todo
  init: function() {
    this.toggleAll.state = 'uncomplete'
    this.toggleAll.classList.add('uncomplete')
    this.toggleAll.addEventListener('click', function(event){
      this.toggleAllItems()
    } )
  },

  addItem: function(itemText) {
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

  removeItem: function(item){
    this.list.removeChild(item)
  },

  //Argument must be the type of button to be added in string format
  //Button type must be a pre-existing style class
  addButton: function(buttonType) {
    let newButton = document.createElement('button')
    newButton.innerText = buttonType
    newButton.classList.add(buttonType)
    return newButton
  },

  setItemState: function(item) {
    let itemState = document.createElement('div')
    itemState.innerText = 'uncomplete'
    //itemState will be default uncomplete
    item.classList.add('uncomplete')
    itemState.addEventListener('click', event => checkItemStatus(item))

    return itemState
  },

  setReorderIcon: function(item) {
    //if item is firstchild in Nodelist, set top up-arrow order visibility to null
    //if item is laslchild, set down-arrow visibility to null
    //if item is neither, set both arrows visibility to show
  },

  addToRemainingItems: function() {
    this.remainingItemsAmount++
    this.remainingItemsText.innerText = this.remainingItemsAmount
  },

  removeFromRemainingItems: function() {
    this.remainingItemsAmount--
    this.remainingItemsText.innerText = this.remainingItemsAmount
  },

  checkItemStatus: function(item) {
    if (item.children[0].className === 'uncomplete'){
      this.markAsComplete(item)
    }
    else if (item.children[0].className === 'complete'){
      this.markAsUncomplete(item)
    }
  },

  markAsComplete: function(item) {
      item.children[0].innerText = 'complete'
      item.children[0].classList.remove('uncomplete')
      item.children[0].classList.add('complete')
      this.strikeTroughItem(item)
  },

  markAsUncomplete: function(item) {
      item.children[0].innerText = 'uncomplete'
      item.children[0].classList.remove('complete')
      item.children[0].classList.add('uncomplete')
      this.unStrikeItem(item)
  },

  strikeThroughItem: function(item) {
    //add CSS attribute to strike through item text
  },

  unStrikeItem: function(item) {
    //remove CSS attribute to strike through item text
  },

  toggleAllItems: function() {
    if (this.toggleAll.state === 'uncomplete'){
      for (let i = 0; i < this.allItems.length; i++){
        this.markAsComplete(allItems[i])
      }
      this.toggleAll.state = 'complete'
    }
    else {
      for (let i = 0; i < this.allItems.length; i++){
        this.markAsUncomplete(allItems[i])
      }
      this.toggleAll.state = 'uncomplete'
    }
  }


}