'use strict';

const Todo = {
    list: document.getElementById('todo-list'),
    listArray: [], // local storage list
    toggleAll: document.getElementById('toggle-all'),
    remainingItemsText: document.getElementById('todo-length'),
    remainingItemsAmount: 0,

    //*** Methods of the todo ***//

    init: function () {
      // storing this context for eventListeners
      let self = this
      this.toggleAll.state = localStorage.toggleAll || 'uncomplete'
      this.toggleAll.addEventListener('click', function (event) {
        self.toggleAllItems()
      })

      // Reset items remianing
      this.remainingItemsText.innerText = this.remainingItemsAmount + ' items remaining'

      if (localStorage.list && localStorage.list !== '[]') {
        this.populateList()
      } else {
        //pre-set todo items with instructions
        this.addItem('Enter a new todo item in the input field.')
        this.addItem('Click on the trashcan icon to remove a todo.')
        this.addItem('Click on the checkmark box to mark an item as done.')
      }
    },

    // populate list with local storage
    populateList: function () {
      this.listArray = JSON.parse(localStorage.list)
      this.listArray.forEach(element => {
        this.addItem(element.task, element.state)
      })

      // add missing classes to repopulated list
      for (let i = 0; i < this.list.children.length; i++) {
        if (this.list.children[i].children[0].className === 'complete') {
          console.log('emoving...')
          this.strikeThroughItem(this.list.children[i])
          this.removeFromRemainingItems()
        } else {
          this.unStrikeItem(this.list.children[i])
        }
      }
    },

    saveToLocaleStorage: function () {
      for (let i = 0; i < this.list.children.length; i++) {
        this.listArray[i] = {
          task: this.list.children[i].children[1].outerText,
          state: this.list.children[i].children[0].className
        }
      }
      localStorage.setItem('list', JSON.stringify(this.listArray))
      localStorage.setItem('toggleAll', this.toggleAll.state)
      localStorage.setItem('remainingItems', this.remainingItemsAmount)
    },

    removeFromLocalStorage: function() {
      //need to refactor to only clear one item from storage at a time
      localStorage.removeItem('list')
      this.listArray = []
      this.saveToLocaleStorage()
    },

    // Finds the index of the item in the list
    findChildIndex: function (item) {
      for (let i = 0; i < this.list.children.length; i++) {
        if (this.list.children[i] === item) return i
      }
    },

    // check if item is first on list
    isFirstChild: function (item) {
      return item === this.list.firstElementChild ? true : false
    },

    // check if item is last on list
    isLastChild: function (item) {
      return item === this.list.lastElementChild ? true : false
    },

    addItem: function (itemText, storedState) {
      //storing this context for eventListeners
      let self = this

      let item = document.createElement('li')
      item.classList.add('box-container')

      let textArea = this.setTextArea(itemText, item)

      let itemState = this.setItemState(item, storedState)

      let removeButton = this.addButton('remove')
      removeButton.addEventListener('click', function (event) {
        self.removeItem(item)
      })

      item.appendChild(itemState)
      item.appendChild(textArea)
      item.appendChild(removeButton)
      this.list.appendChild(item)
      if (this.list.children.length % 2 === 0) item.classList.add('grey-bg')
      this.addToRemainingItems()

      // Don't add arrows until list length > 1
      if (this.list.children.length > 1) {
        let previousItem = this.list.lastChild.previousSibling
        this.addUpArrow(item)
        this.addDownArrow(previousItem)
      }
      this.saveToLocaleStorage(item)
    },

    removeItem: function (item) {
      let previous = item.previousSibling, next = item.nextSibling
      this.list.removeChild(item)

      // If list length > 2 then update arrows, otherwise just remove the arrows of the remaining items on list
      if (this.list.children.length > 2){
        if (previous && previous.children) this.updateArrows(previous)
        if (next) this.updateArrows(next)
      } else {
        if (previous && previous.children) previous.removeChild(previous.children[3])
        if (next) {
          console.log('next')
          next.removeChild(next.children[3])
        }
      }
      alert('Item removed!') // make alert pop up after removal
      // Only want to remove from remainingItems if itemState is set to uncomplete
      if (item.children[0].className === 'uncomplete') {
        this.removeFromRemainingItems()
      }
      this.removeFromLocalStorage()
    },

    // Argument must be the type of button to be added in string format
    addButton: function (buttonType) {
      let newButton = document.createElement('button')
      newButton.classList.add(buttonType)
      return newButton
    },

    setItemState: function (item, storedState) {
      // Storing this context for eventListeners
      let self = this
      let itemState = document.createElement('div')
      let state = storedState || 'uncomplete' // will populate from localStorage if there is any task already there

      itemState.classList.add(state)
      itemState.addEventListener('click', function (event) {
        self.checkItemStatus(item)
      })

      return itemState
    },

    setTextArea: function (itemText, item) {
      // Storing this context for eventListeners
      let self = this
      let textArea = document.createElement('div')
      textArea.classList.add('text-area')
      textArea.innerText = itemText
      // Double click does not work on mobile touch screen
      textArea.addEventListener('dblclick', function (event) {
        self.addEditField(textArea, item)
      })

      return textArea
    },

    addEditField: function (textArea, item) {
      let self = this

      let editItemForm = document.createElement('INPUT')
      editItemForm.type = 'text'
      editItemForm.value = textArea.innerText
      editItemForm.addEventListener('keyup', function (event) {
        event.preventDefault()
        if (event.keyCode === 13 && this.value) {
          self.editItem(this.value, item)
        }
      })

      item.replaceChild(editItemForm, textArea)
    },

    //called after item edit is finished
    editItem: function (itemText, item) {
      let editedTextArea = this.setTextArea(itemText, item)
      item.replaceChild(editedTextArea, item.children[1])
      this.saveToLocaleStorage()
    },

    addUpArrow: function (item) {
      let self = this
      let arrow = document.createElement('div')
      arrow.classList.add('up-arrow')
      arrow.addEventListener('click', function (event) {
        self.moveUp(item)
      })
      item.appendChild(arrow)
    },

    addDownArrow: function (item) {
      let self = this
      let arrow = document.createElement('div')
      arrow.classList.add('down-arrow')
      arrow.addEventListener('click', function (event) {
        self.moveDown(item)
      })
      item.appendChild(arrow)
    },

    // Moves an item up in the list
    moveUp: function (item) {
      let sibling = item.previousSibling
      this.list.insertBefore(item, sibling)
      this.updateArrows(item)
      this.updateArrows(sibling)
    },

    // Moves an item down in the list
    moveDown: function (item) {
      let sibling = item
      item = sibling.nextSibling
      this.list.insertBefore(item, sibling)
      this.updateArrows(item)
      this.updateArrows(sibling)
    },

    // Updates the arrow classes of item argument
    // and checks to make sure first and last item on list
    // have correct arrows
    updateArrows: function (item) {
      if (this.isFirstChild(item)) {
        if (item.children[3] && item.children[3].className === 'up-arrow') item.removeChild(item.children[3])
      }
      else if (this.isLastChild(item)) {
        if (item.children[4]) item.removeChild(item.children[4])
      }
      else {
        // first if is for rearranging the order of the arrow classes
        // in the very first item added
        if (item.children[3].className === 'down-arrow') {
          item.removeChild(item.children[3])
          this.addUpArrow(item)
          this.addDownArrow(item)
        }
        else if (item.children[4] === undefined) this.addDownArrow(item)
      }
      this.saveToLocaleStorage()
    },

    addToRemainingItems: function () {
      this.remainingItemsAmount++
        this.remainingItemsText.innerText = this.remainingItemsAmount + " items remaining"
    },

    removeFromRemainingItems: function () {
      this.remainingItemsAmount--
        this.remainingItemsText.innerText = this.remainingItemsAmount + " items remaining"
    },

    checkItemStatus: function (item) {
      if (item.children[0].className === 'uncomplete') {
        this.markAsComplete(item)
      } else if (item.children[0].className === 'complete') {
        this.markAsUncomplete(item)
      }
    },

    markAsComplete: function (item) {
      item.children[0].classList.replace('uncomplete', 'complete')
      this.strikeThroughItem(item)
      this.removeFromRemainingItems()
      this.saveToLocaleStorage()
    },

    markAsUncomplete: function (item) {
      item.children[0].classList.replace('complete', 'uncomplete')
      this.unStrikeItem(item)
      this.addToRemainingItems()
      this.saveToLocaleStorage()
    },

    strikeThroughItem: function (item) {
      item.children[1].classList.add('strikethrough')
    },

    unStrikeItem: function (item) {
      item.children[1].classList.remove('strikethrough')
    },


    toggleAllItems: function () {
      if (this.toggleAll.state === 'uncomplete') {
        this.toggleAllAsComplete()
      } else {
        this.toggleAllAsUncomplete()
      }
      this.saveToLocaleStorage()
    },

    toggleAllAsComplete: function () {
      for (let i = 0; i < this.list.children.length; i++) {
        // Only toggle items that are uncomplete
        if (this.list.children[i].children[0].className === 'uncomplete') {
          this.markAsComplete(this.list.children[i])
        }
      }
      this.toggleAll.state = 'complete'
      this.toggleAll.classList.replace('uncomplete', 'complete')
    },

    toggleAllAsUncomplete: function () {
        for (let i = 0; i < this.list.children.length; i++) {
          //Only toggle items that are complete
          if (this.list.children[i].children[0].className === 'complete') {
            this.markAsUncomplete(this.list.children[i])
          }
        }
        this.toggleAll.state = 'uncomplete'
        this.toggleAll.classList.replace('complete', 'uncomplete')
  }


}
