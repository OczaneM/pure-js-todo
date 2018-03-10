'use strict'

const EventDelegator = {
  delegate: function () {
    document.addEventListener('DOMContentLoaded', function() {

      app.addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'LI') {
          let item = event.target

        }
        else if (event.target && event.target.nodeName === 'I') {
          let item = event.target
          // get the task text value from the p element before it
          let previousItem = item.previousSibling
          let task = state.list.find(elem => elem.value === previousItem.innerText)
          removeTaskFromList(task)
          refreshItemCount()

        }
        else if (event.target && event.target.nodeName === 'INPUT') {
          let item = event.target
          let nextItem = item.nextSibling
          if (item.id === 'toggle-all'){
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
          }
          else if (item.type === 'checkbox') {
            // match state list task with DOM list task
            let task = state.list.find(elem => elem.value === nextItem.innerText)
            task.complete = !task.complete
            task.complete ? task.strikethrough = 'strikethrough' : task.strikethrough = 'none'
          }
          Create.populateList()
        }
      })

    })
  }
}
