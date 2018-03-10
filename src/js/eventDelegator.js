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
        else if (event.target && event.target.nodeName === 'LI') {
          let item = event.target

        }
      })

    })
  }
}
