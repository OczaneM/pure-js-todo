'use strict'

const create = {

  render: function () {
    // This fnction will re-render every time it is called.
    // Therefore need to remove the old children from the
    // parent node.
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    for (let k = 0; k < state.list.length; k++){
      listContainer.appendChild(
        li({className: 'task-holder'}, null,
          input({type: 'checkbox', className: 'checkbox'}, null),
          p(null, state.list[k].value),
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
    this.render()
  },


}
