'use strict'

// const todo = Object.create(Todo)
// todo.init()


// //Add a task to the list after enter key is pressed
// //Only when there is text in the field
// let newItem = document.getElementById('add-item')
// newItem.addEventListener('keyup', function(event) {
//   event.preventDefault()
//   if(event.keyCode === 13 && this.value){
//     todo.addItem(this.value)
//     this.value = ''
//   }
//   else if (!this.value) alert('Field cannot be empty!')
// })

// Check localStorage to populate current session list
window.onload = function () {
  if (localStorage.todoList) {
    getListData()
    for (let i = 0; i < state.list.length; i++){
      if (state.list[i].complete === false) state.itemCounter++
      addTaskToList(task)
    }
  }
  else storeListData() // stores newly generated list on localStorage
}




