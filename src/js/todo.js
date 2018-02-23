'use strict';

const Todo = {
  //Data members of the todo
  list: document.getElementById('todo-list'),
  allItems: document.getElementsByTagName('li'),
  toggleAll: document.getElementById('toggle-all'),
  remainingItemsText: document.getElementById('todo-length'),
  remainingItemsAmount: 0,


  // Methods of the todo

  init: function() {
    // storing this context for eventListeners
    let self = this
    this.toggleAll.state = 'uncomplete'
    this.toggleAll.addEventListener('click', function(event){
      self.toggleAllItems()
    } )

    this.remainingItemsText.innerText = 1
  },

  addItem: function(itemText) {
    //storing this context for eventListeners
    let self = this

    let item = document.createElement('li')
    item.classList.add('box-container')

    let textArea = this.setTextArea(itemText, item)

    let itemState = this.setItemState(item)

    let removeButton = this.addButton('remove')
    removeButton.addEventListener('click', function(event) {
      self.removeItem(item)
    })

    //this.setReorderIcon(item)

    item.appendChild(itemState)
    item.appendChild(textArea)
    item.appendChild(removeButton)
    this.list.appendChild(item)
    this.addToRemainingItems()
  },

  removeItem: function(item) {
    this.list.removeChild(item)
    alert('Item removed!') //make alart pop up after removal
    // Only want to remove from remainingItems if itemState is set to uncomplete
    if(item.children[0].className === 'uncomplete'){
      this.removeFromRemainingItems()
    }
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
    //storing this context for eventListeners
    let self = this
    let itemState = document.createElement('div')
    //itemState default as uncomplete
    itemState.classList.add('uncomplete')
    itemState.addEventListener('click', function(event) {
      self.checkItemStatus(item)
    })

    return itemState
  },

  setTextArea: function(itemText, item) {
    let self = this

    let textArea = document.createElement('div')
    textArea.classList.add('text-area')
    textArea.innerText = itemText
    textArea.addEventListener('dblclick', function() {
      self.addEditField(textArea, item)
    })
    return textArea
  },

  addEditField: function(textArea, item) {
    let self = this

    let editItemForm = document.createElement('INPUT')
    editItemForm.type = 'text'
    editItemForm.value = textArea.innerText
    editItemForm.addEventListener('keyup', function(event) {
      event.preventDefault()
      if(event.keyCode === 13 && this.value){
        self.editItem(this.value, item)
      }
    })

    item.replaceChild(editItemForm, textArea)
  },

  editItem: function(itemText, item) {
    let editedTextArea = this.setTextArea(itemText, item)
    item.replaceChild(editedTextArea, item.children[1])
  },

  setReorderIcon: function(item) {
    //if item is firstchild in Nodelist, set top up-arrow order visibility to null
    //if item is laslchild, set down-arrow visibility to null
    //if item is neither, set both arrows visibility to show
  },

  addToRemainingItems: function() {
    this.remainingItemsAmount++
    this.remainingItemsText.innerText = this.remainingItemsAmount + " items remaining"
  },

  removeFromRemainingItems: function() {
    this.remainingItemsAmount--
    this.remainingItemsText.innerText = this.remainingItemsAmount + " items remaining"
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
      item.children[0].classList.replace('uncomplete', 'complete')
      this.strikeThroughItem(item)
      this.removeFromRemainingItems()
  },

  markAsUncomplete: function(item) {
      item.children[0].classList.replace('complete', 'uncomplete')
      this.unStrikeItem(item)
      this.addToRemainingItems()
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
        //we only want to toggle uncomplete items
        if (this.allItems[i].children[0].className === 'uncomplete'){
          this.markAsComplete(this.allItems[i])
        }
      }
      this.toggleAll.state = 'complete'
      this.toggleAll.classList.replace('uncomplete', 'complete')
    }
    else {
      for (let i = 0; i < this.allItems.length; i++){
        //we only want to toggle complete items
        if (this.allItems[i].children[0].className === 'complete') {
          this.markAsUncomplete(this.allItems[i])
        }
      }
      this.toggleAll.state = 'uncomplete'
      this.toggleAll.classList.replace('complete', 'uncomplete')
    }
  }


}
