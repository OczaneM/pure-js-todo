'use strict'

const CreateForm = {
  inputHandler: function () {
    taskInput.addEventListener('keyup', function(event) {
      event.preventDefault()
      if (!this.value)  alert('Field cannot be empty!')
      else if (this.value > MAX_CHARACTER_LIMIT) alert(`Task cannot exceed ${MAX_CHARACTER_LIMIT} characters`)
      else if (event.keyCode === 13){
        create.createNewTask(this.value)
        storeListData()
        this.value = ''
      }
    })
  }
}
