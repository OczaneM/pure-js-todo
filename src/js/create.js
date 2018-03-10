'use strict'

const Create = {
  render: function () {
    app.appendChild(
      section({id: 'create-tab', className: 'tab-panel'}, null,
        header({className: 'create-header active'}, null,
          div({clasName: 'toggle-all-checkbox-container'}, null,
            input({id: 'toggle-all', type: 'checkbox', type: 'checkbox'}, null)
          ),
          input({id: 'task-input-field', type: 'text', placeholder: 'Type new task and hit enter.'}, null),
          ul({id: 'todo-list'}, null,
            this.populateList()
          )
        )
      )
    )
  },

  populateList: function () {
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
