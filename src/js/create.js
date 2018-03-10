'use strict'
const createForm = Object.create(CreateForm)

const Create = {
  render: function () {
    app.appendChild(
      section({id: 'create-tab', className: 'tab-panel'}, null,
        header({className: 'create-header active'}, null,
          div({className: 'toggle-all-checkbox-container'}, null,
            input({id: 'toggle-all', type: 'checkbox', className: 'checkbox'}, null)
          ),
          input({id: 'task-input-field', type: 'text', placeholder: 'Type new task and hit enter.'}, null)
        ),
        ul({id: 'todo-list'}, null

        )
      )
    )
    refreshQueries()
    this.populateList()
    createForm.inputHandler()
  },

  populateList: function () {
    // This function will re-render every time it is called.
    // Therefore need to remove the old children from the
    // parent node.
    while (listContainer && listContainer.firstChild) {
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
    incrementItemCount()
    addTaskToList(task)
    this.populateList()
  }
}
