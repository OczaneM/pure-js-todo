'use strict'

const EventDelegator = {
  delegate: function () {
    document.addEventListener('DOMContentLoaded', function() {

      app.addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'LI') {
          let item = event.target
          alert('you clicked on item: ' + item.innerHTML)
        }
      })

    })
  }
}
