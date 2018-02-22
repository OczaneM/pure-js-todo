
// • Allows users to add todo items by typing into the text field and hitting Enter.
// • By clicking on the todo items on the list it should get a strike through and a different icon state to show that it’s marked as “done”, clicking again will reset its state. Refer to the designs for the todo item states.
// • Double clicking on the text of an todo item would allow inline editing of the text, enter to save edits.
// • Have a toggle that can switch all items between done or not.
// • Number of items left to do should reflect the number of items that are not marked as done.
// • Todo items can be removed by clicking on the trash bin button, where it will launch a modal to confirm deletion.
// • The up and down arrows can be used to rearrange the order of items
// • Try to match the design with CSS
// • The app should also work on mobile devices. Use your best judgement on how it should look on mobile devices.
// • The content of the todo list is saved to a JSON object and saved in localStorage on every action
// • The content of the todo list can be repopulated from the same JSON object from localStorage on a page refresh



let todoList = document.getElementById('todo-list')
let item = document.getElementById('add')

//Add a task to the list after enter pressed
//Only when there is text in the field
item.addEventListener('keyup', function(event) {
  if(event.keyCode === 13 && this.value){
    addItem(this.value)
  }
  else if(!this.value) alert('Field cannot be empty')
})

function addItem(itemText) {
  let newItem = document.createElement('li')
  let uncomplete = document.createElement('div')
  let reorderIcon = document.createElement('div')
  let removeButton = document.createElement('button')

  newItem.innerText = itemText
  removeButton.classList.add('removeButton')
  uncomplete.classList.add('uncomplete')

  newItem.appendChild(uncomplete)
  newItem.appendChild(reorderIcon)
  newItem.appendChild(removeButton)
  todoList.appendChild(newItem)
}



