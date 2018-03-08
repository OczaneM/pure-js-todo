'use strict'

const Todo = {
  createTask: function (taskVal) {
    let task = {
      id: state.idCounter,
      value: taskVal,
      complete: false
    }
    state.idCounter++
    state.itemCounter++
    addTaskToList(task)
  }
}
