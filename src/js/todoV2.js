'use strict'

const Todo = {
  createTask: function () {
    let task = {
      id: idCounter,
      value: taskInput,
      complete: false
    }
    idCounter++
    itemCounter++
    addToList(task)
  }
}
