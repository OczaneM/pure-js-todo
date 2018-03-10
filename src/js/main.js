'use strict'
const create = Object.create(Create)
const navigation = Object.create(Nav)
// Check localStorage to populate current session list
window.onload = function () {
  if (localStorage.todoState) {
    getListData()

    // Populate List
    create.render()
  }
  else storeListData() // stores newly generated list on localStorage
}

const Main = {
  render: function () {
    navigation.render()
    switch (VIEW) {
      case 'createTab':
          create.render()
          break
      case 'searchTab':
          //search.render()
          break
      case 'configure':
          //configure.render()
          break
      default:
          break
    }
    create.render()
  }
}

//Add a task to the list after enter key is pressed
//Only when there is text in the field
// taskInput.addEventListener('keyup', function(event) {
//   event.preventDefault()
//   if (!this.value)  alert('Field cannot be empty!')
//   else if (this.value > MAX_CHARACTER_LIMIT) alert(`Task cannot exceed ${MAX_CHARACTER_LIMIT} characters`)
//   else if (event.keyCode === 13){
//     create.createNewTask(this.value)
//     storeListData()
//     this.value = ''
//   }
// })
