'use strict';

const Todo = {
  //Data members of the todo
  list: document.getElementById('todo-list'),
  // Can eliminate allItems for using list.children instead
  allItems: document.getElementsByTagName('li'),
  toggleAll: document.getElementById('toggle-all'),
  remainingItemsText: document.getElementById('todo-length'),
  remainingItemsAmount: 0,
  currentItem: null, // for keeping track of item arrows


  // Methods of the todo

  init: function() {
    // storing this context for eventListeners
    let self = this
    this.toggleAll.state = 'uncomplete'
    this.toggleAll.addEventListener('click', function(event){
      self.toggleAllItems()
    } )

    this.remainingItemsText.innerText = 0 + ' items remaining'
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

    let upArrow = this.setOrderArrows(item, 'up-arrow')

    let downArrow = this.setOrderArrows(item, 'down-arrow')

    item.appendChild(itemState)
    item.appendChild(textArea)
    item.appendChild(removeButton)
    this.list.appendChild(item)
    this.addToRemainingItems()
    if(this.list.children.length > 1) {
      item.appendChild(upArrow) // current last child
      // send the next to last child to get its arrow updated
      this.updateArrows(downArrow, this.list.children[this.list.children.length-2])
    }
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
    // Double click does not work on mobile touch screen
    textArea.addEventListener('dblclick', function(event) {
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

  setOrderArrows: function(item, arrowType) {
    // For event listener
    let self = this

    let arrow = document.createElement('div')
    arrow.classList.add(arrowType)
    arrow.addEventListener('click', function(event) {
      self.updateOrder(item, arrow)
    })
    return arrow
  },

  // Updates the order of nodes in the list tree
  // when an arrow is clicked
  updateOrder: function(item, arrow) {
    // Use the loop to search for the child index
    for (let i = 0; i < this.allItems.length; i++){
      if (this.allItems[i] == item)
        if (arrow.className === 'down-arrow'){
          this.list.insertBefore(this.list.children[i+1], item)
          this.updateArrows(arrow, item)
          break;
        }
        else if (arrow.className === 'up-arrow'){
          this.list.insertBefore(item, this.list.children[i-1])
          this.updateArrows(arrow, item)
          break;
        }
    }
  },

  // Updates the arrow of an added item
  // after list has been updated
  updateArrows: function(arrow, item) {
    let firstItem = this.list.firstChild
    let lastItem = this.list.lastChild
    if (arrow.className === 'down-arrow'){
      if (!firstItem.contains(arrow)){
        firstItem.appendChild(arrow)
      }
      if (lastItem.contains(arrow)){
        lastItem.removeChild(arrow)
      }
      //update arrow of sent item
      if(item !== firstItem && item !== lastItem && !item.contains(arrow)){
        item.appendChild(arrow)
      }
    }
    else if (arrow.className === 'up-arrow'){
      if (firstItem.contains(arrow)){
        firstItem.removeChild(arrow)
      }
      if (!lastItem.contains(arrow)){
        lastItem.removeChild(arrow)
      }
    }
    // if (this.currentItem === null){
    //   this.currentItem = this.list.firstChild
    //   this.currentItem.appendChild(downArrow)
    //   this.currentItem = this.list.firstChild.nextSibling
    // }

    // else {
    //   this.currentItem.appendChild(downArrow)
    //   this.currentItem = this.currentItem.nextSibling
    // }
  },

  checkLastChild: function(item){
    if (item === this.list.lastChild){
      item.removeChild(item.children)
    }
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
