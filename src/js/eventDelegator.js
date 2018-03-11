'use strict'

const EventDelegator = {
  delegate: function () {
    let self = this
    document.addEventListener('DOMContentLoaded', function() {
      app.addEventListener('mouseup', eventsCallBack)
    })
  },

  setIEvents: function (event) {
    let item = event.target
    // trashcan button
    if (item.className === 'fas fa-trash-alt'){
      this.removeItem(item.parentNode)
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

  addDoubleClickEvent: function (event) {
    let item = event.target
    item.removeEventListener('mouseup', eventsCallBack, true)
    console.log(eventsCallBack)
    item.addEventListener('dblclick', function (event) {
      alert('doube clicked!')
      // if (event.target && event.target.nodeName === 'LI') {
      //   let item = event.target
      //   let textArea = item.children[1] // Get the p element with task text
      //   item.replaceChild(
      //     input({id: 'editTask', type: 'text', value: textArea.innerText}),
      //     textArea
      //   )
      // }
    })
  }
}

function eventsCallBack (event) {
    refreshQueries()
    if (event.target && event.target.nodeName === 'LI') {
      EventDelegator.addDoubleClickEvent(event)
    }
    else if (event.target && event.target.nodeName === 'I') {
     EventDelegator.setIEvents(event)
    }
    else if (event.target && event.target.nodeName === 'INPUT') {
      EventDelegator.setInputEvents(event)
    }
    Create.populateList()
}
