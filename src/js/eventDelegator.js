'use strict'

const EventDelegator = {
  delegate: function () {
    let self = this
    document.addEventListener('DOMContentLoaded', function() {

      app.addEventListener('click', function(event) {
        refreshQueries()
        if (event.target && event.target.nodeName === 'I') {
          let item = event.target
          // trashcan button
          if (item.className === 'fas fa-trash-alt'){
            self.removeItem(item)
          }
          else if (item.className === 'fas fa-caret-up') { // up arrow
            self.moveUp(item.parentNode)
          }
          else if (item.className === 'fas fa-caret-down') {// down arrow
            self.moveDown(item.parentNode)
          }
          refreshItemCount()
        }
        else if (event.target && event.target.nodeName === 'INPUT') {
          // checkboxes
          let item = event.target
          let nextItem = item.nextSibling
          if (item.id === 'toggle-all'){
            self.toggleAllCheckboxes(item)
          }
          else if (item.type === 'checkbox') {
            self.toggleSingleCheckbox(nextItem)
          }
        }
        Create.populateList()
      })

    })
  },

  removeItem: function (item) {
    // get the task text value from the p element before it
    let previousItem = item.previousSibling
    let task = state.list.find(elem => elem.value === previousItem.innerText)
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
  }
}
