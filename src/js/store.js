'use strict'



//*** CONFIGURATION PARAMETERS */

const MAX_CHARACTER_LIMIT = 25
const MAX_LIST_ITEMS = 50 // includes complete and uncomplete items
const MAX_ITEMS_ON_DISPLAY = 20
const SHOW_UNCOMPLETE_ITEMS = true
const SHOW_COMPLETE_ITEMS = true
//const COMPLETE_ITEM_COLOR = dimgray
//const UNCOMPLETE_ITEM_COLOR = lightgrey
const COLOR_ODD_NUMBER_TASK_HOLDERS = false
const NEW_TASKS_AT_TOP = true
const APP_MAX_WIDTH = 100 // percentage
const APP_MAX_HEIGHT = 100 // percentage
const APP_MIN_WIDTH = 375 // pixels
const APP_MIN_HEIGHT = 400 // pixels

//*** STATE */
const state = {
  list: [],
  itemCounter: 0,
  idCounter: 0
}

//*** SELECTORS */
const TASK_INPUT = 'task-input-field'
const LIST_CONTAINER = 'todo-list'
const ALL_TASKS = 'li.task-holder'

//*** QUERIES */
var taskInput = document.getElementById(TASK_INPUT)
var listContainer = document.getElementById(LIST_CONTAINER)
var taskContainers = document.querySelectorAll(ALL_TASKS)

//*** DATA STORAGE FUNCS */
function getListData () {
  var data = JSON.parse(localStorage.todoList)
  setList(data)
}

function storeListData () {
  localStorage.todoList = JSON.stringify(state.list)
}

//*** LIST FUNCS */
function setList (listArray) {
  state.list = listArray
}

function addTaskToList (task) {
  if (!state.list.find(task)) state.list.push(task)
  let newTaskContainer = createDomElem('li')
  let newTask = createDomElem('p', task.value)
  let checkbox = createDomElem('input')
  let deleteButton = createDomElem('i')

  setAttributes(newTaskContainer, ['class'], ['task-holder'])
  setAttributes(checkbox, ['type', 'class', 'checked'], ['checkbox', 'checbox', false])
  setAttributes(deleteButton, ['class', 'class'], ['fas', 'fa-trash-alt'])

  // newTaskContainer.className = 'task-holder'
  // checkbox.type = 'checkbox'
  // checkbox.className = 'checkbox'
  // checkbox.checked = false
  // deleteButton.classList.add('fas')
  // deleteButton.classList.add('fa-trash-alt')

  newTaskContainer.appendChild(checkbox)
  newTaskContainer.appendChild(newTask)
  newTaskContainer.appendChild(deleteButton)

  if (NEW_TASKS_AT_TOP){
    listContainer.insertBefore(newTaskContainer, taskContainers.firstChild)
  }
  else listContainer.appendChild(newTaskContainer)
}

function removeTaskFromList (task) {
  let index = state.list.indexOf(task)
  removeDomElem(index)
  state.list.splice(index, 1)
}

function resetItemCounter () {
  state.itemCounter = 0
}


//*** DOM MANIPULATION */

function createDomElem (elemType, text) {
  let newElem = document.createElement(elemType)
  if (text) {
    let newTextNode = document.createTextNode(text)
    newElem.appendChild(newTextNode)
  }
  return newElem
}

function removeDomElem (elemIndex) {
  let element = taskContainers[elemIndex]
  listContainer.removeChild(element)
}

function setAttributes (elem, attTypes, attValues) {
  for (let i = 0; i < attTypes.length; i++) {
    elem.setAttribute(attTypes[i], attValues[i])
  }
}
