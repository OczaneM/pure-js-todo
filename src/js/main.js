'use strict'

// Check localStorage to populate current session list
window.onload = function () {
  if (localStorage.todoState) {
    getListData()
    // Populate List
    for (let i = 0; i < state.list.length; i++){
      if (state.list[i].complete === false) state.itemCounter++
      addTaskToList(state.list[i])
    }
  }
  else storeListData() // stores newly generated list on localStorage
}

const todo = Object.create(Todo)

//Add a task to the list after enter key is pressed
//Only when there is text in the field
taskInput.addEventListener('keyup', function(event) {
  event.preventDefault()
  if (!this.value)  alert('Field cannot be empty!')
  else if (this.value > MAX_CHARACTER_LIMIT) alert(`Task cannot exceed ${MAX_CHARACTER_LIMIT} characters`)
  else if (event.keyCode === 13){
    todo.createTask(this.value)
    storeListData()
    this.value = ''
  }
})
