'use strict'

const create = {

  render: function () {
    for (let i = 0; i < state.list.length; i++){
      listContainer.appendChild(
        li({className: 'task-holder'}, null,
          input({type: 'checkbox', className: 'checkbox'}, null),
          p(null, state.list[i].value),
          i({className: 'fas fa-trash-alt'}, null)
        )
      )
    }
  },

  createNewTask: function (taskVal) {
    let task = {
      id: state.idCounter,
      value: taskVal,
      complete: false
    }
    state.idCounter++
    state.itemCounter++
    addTaskToList(task)
  },


}
