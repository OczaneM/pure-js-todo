
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
let newItem = document.getElementById('add')
let allItems = document.getElementsByTagName('li')

let toggleAllCheckbox = document.getElementById('toggle-all')
//set toggleAllCheckbox to default uncomplete
toggleAllCheckbox.classList.add('uncomplete')
toggleAllCheckbox.state = 'uncomplete'
console.log(toggleAllCheckbox)
toggleAllCheckbox.addEventListener('click', function(event){
  toggleAllItems()
})

let listLength = document.getElementById('todo-length')

//Add a task to the list after enter key is pressed
//Only when there is text in the field
newItem.addEventListener('keyup', function(event) {
  if(event.keyCode === 13 && this.value){
    addItem(this.value)
    //Clear text field after enter is pressed
    this.value = ''
  }
  else if(!this.value) alert('Field cannot be empty')
})

//All new items get added as uncomplete
function addItem(itemText) {
  let item = document.createElement('li')
  item.innerText = itemText
  item.classList.add('single-item')

  let itemState = document.createElement('div')
  itemState.innerText = 'uncomplete'
  itemState.classList.add('uncomplete')
  itemState.addEventListener('click', function(event) {
    toggleSingleItem(item)
  })

  let reorderIcon = document.createElement('div')
  reorderIcon.classList.add('reorder')

  let removeButton = document.createElement('button')
  removeButton.innerText = 'remove'
  removeButton.classList.add('removeButton')
  removeButton.addEventListener('click', function(event) {
    removeItem(item)
  })


  item.appendChild(itemState)
  item.appendChild(reorderIcon)
  item.appendChild(removeButton)
  todoList.appendChild(item)
  listLength.innerText = allItems.length + ' remaining items'
  console.log(allItems.length)

}

function removeItem(item) {
  todoList.removeChild(item)
}

//Toggle the completed status of an item
function toggleSingleItem(item) {
  if (item.children[0].className === 'uncomplete'){
    item.children[0].innerText = 'complete'
    item.children[0].classList.remove('uncomplete')
    item.children[0].classList.add('complete')
  }
  else if (item.children[0].className === 'complete') {
    item.children[0].innerText = 'uncomplete'
    item.children[0].classList.remove('complete')
    item.children[0].classList.add('uncomplete')
  }
  console.log(item.children[0].innerText)
}

//toggle itemState of all items to complete
function toggleAllItems() {
  if (toggleAllCheckbox.state === 'uncomplete'){

  console.log("within the uncomplete toggle func")
    for(let i = 0; i < allItems.length; i++){
      allItems[i].children[0].innerText = 'complete'
      allItems[i].children[0].classList.remove('uncomplete')
      allItems[i].children[0].classList.add('complete')
    }
    toggleAllCheckbox.state = 'complete'
  }
  else if (toggleAllCheckbox.state === 'complete'){

  console.log("within the complete toggle func")
    for(let i = 0; i < allItems.length; i++){
      allItems[i].children[0].innerText = 'uncomplete'
      allItems[i].children[0].classList.remove('complete')
      allItems[i].children[0].classList.add('uncomplete')
    }
    toggleAllCheckbox.state = 'uncomplete'
  }

}
