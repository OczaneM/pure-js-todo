'use strict'

const EventDelegator = {
  delegate: function () {
    let self = this
    document.addEventListener('DOMContentLoaded', function() {
      app.addEventListener('click', eventsCallBack)
    })
  },

  setIEvents: function (event) {
    let item = event.target
    // trashcan button
    if (item.className === 'fas fa-trash-alt'){
      let result = confirm('Delete this item?')
      if (result) this.removeItem(item.parentNode)
    }
    else if (item.className === 'fas fa-caret-up') { // up arrow
      this.moveUp(item.parentNode)
    }
    else if (item.className === 'fas fa-caret-down') {// down arrow
      this.moveDown(item.parentNode)
    }
    refreshItemCount()
  },

  setInputEvents: function (event) {
    let item = event.target
    let nextItem = item.nextSibling
    if (item.id === 'toggle-all'){
      this.toggleAllCheckboxes(item)
    }
    else if (item.type === 'checkbox') {
      this.toggleSingleCheckbox(nextItem)
    }
    else if (item.id === 'editTask') {
      item.addEventListener('keyup', function () {
        if (event.keyCode === 13 && this.value) {
          self.editItem(this.value, item)
        }
      })
    }
  },

  setButtonEvents: function (event) {
    let item = event.target
    if (item.className === 'cancel-button show') this.hideEditButtons(item)
    else if (item.className === 'edit-button show') this.addEditForm(event)
  },

  removeItem: function (parentNode) {
    // get the task text value from the p element before it
    let taskNode = parentNode.children[1]
    let task = state.list.find(elem => elem.value === taskNode.innerText)
    removeTaskFromList(task)
  },

  moveUp: function (item) {
    if (item.previousSibling) {
      // update DOM
      let sibling = item.previousSibling
      listContainer.insertBefore(item, sibling)
      // update state list
      this.swapListItems(item, 'up')
    }
    else alert ('Can\'t move that item up')

  },

  moveDown: function (item) {
    if (item.nextSibling) {
      // update DOM
      let sibling = item
      item = sibling.nextSibling
      listContainer.insertBefore(item, sibling)
      // update state list
      this.swapListItems(sibling, 'down')
      console.log('LIST2: ', state.list)
    }
    else alert ('Can\'t move that item down')
  },

  swapListItems: function (item, mode) {
    let index
    for (let k = 0; k < taskContainers.length; k++){
      if (taskContainers[k] === item) {
        index = k
        break
      }
    }
    if (mode === 'up'){
      let temp = state.list[index]
      state.list[index] = state.list[index - 1]
      state.list[index - 1] = temp
    }
    else {
      let temp = state.list[index + 1]
      state.list[index + 1] = state.list[index]
      state.list[index] = temp
    }
  },

  toggleAllCheckboxes: function (item) {
    state.list.forEach( task => {
      if (item.checked) {
        task.complete = true
        task.strikethrough = 'strikethrough'
      }
      else {
        task.complete = false
        task.strikethrough = 'none'
      }
    })
  },

  toggleSingleCheckbox: function (item) {
    // match state list task with DOM list task
    let task = state.list.find(elem => elem.value === item.innerText)
    task.complete = !task.complete
    task.complete ? task.strikethrough = 'strikethrough' : task.strikethrough = 'none'
  },

  showEditButtons: function (event) {
    let item = event.target
    let task = state.list.find(elem => elem.value === item.children[1].innerText)
    task.edit = 'edit-button show'
    task.cancel = 'cancel-button show'
    Create.populateList()
  },

  hideEditButtons: function (item) {
    let parent = item.parentNode
    let task = state.list.find(elem => elem.value === parent.children[1].innerText)
    task.edit = 'edit-button hide'
    task.cancel = 'cancel-button hide'
    Create.populateList()
  },

  addEditForm: function (event) {
    let item = event.target
    let textArea = item.parentNode.children[1] // Get the p element with task text
    let editForm = input({className: 'editTask', type: 'text', value: textArea.innerText})
    item.parentNode.replaceChild(editForm, textArea)
    this.hideEditButtons(item)
  }
}

function eventsCallBack (event) {
    refreshQueries()
    if (event.target && event.target.nodeName === 'LI') {
      EventDelegator.showEditButtons(event)
      Create.populateList()
    }
    else if (event.target && event.target.nodeName === 'I') {
     EventDelegator.setIEvents(event)
     Create.populateList()
    }
    else if (event.target && event.target.nodeName === 'INPUT') {
      EventDelegator.setInputEvents(event)
      Create.populateList()
    }
    else if (event.target && event.target.nodeName === 'BUTTON') {
      EventDelegator.setButtonEvents(event)
    }
}


