'use strict'

const EventDelegator = {
  delegate: function () {
    let self = this
    document.addEventListener('DOMContentLoaded', function() {

      app.addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'I') {
          let item = event.target
          // trashcan button
          if (item.className === 'fas fa-trash-alt'){
            self.removeItem(item)
          }
          else if (item.className === 'fas fa-sort-up') { // up arrow
            self.moveUp(item.parentNode)
          }
          else if (item.className === 'fas fa-sort-down') {// down arrow
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
          Create.populateList()
        }
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
    let sibling = item.previousSibling
    this.list.insertBefore(item, sibling)
  },

  moveDown: function (item) {
    let sibling = item
    item = sibling.nextSibling
    this.list.insertBefore(item, sibling)
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
