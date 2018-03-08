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
const NEW_TASKS_AT_TOP = false
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
  var data = JSON.parse(localStorage.todoState)
  setList(data)
}

function storeListData () {
  console.log(state.list)
  localStorage.todoState = JSON.stringify(state)
}

//*** LIST FUNCS */
function setList (data) {
  state.list = data.list
  state.idCounter = data.idCounter
  state.itemCounter = data.itemCounter
}

function addTaskToList (task) {
  if (!state.list.find(elem => elem.id === task.id)) state.list.push(task)
  let newTaskContainer = createDomElem('li')
  let newTask = createDomElem('p', task.value)
  let checkbox = createDomElem('input')
  let deleteButton = createDomElem('i')

  setAttributes(newTaskContainer, ['class'], ['task-holder'])
  setAttributes(checkbox, ['type', 'class'], ['checkbox', 'checkbox'])
  setAttributes(deleteButton, ['class', 'class'], ['fas', 'fa-trash-alt'])

  newTaskContainer.appendChild(checkbox)
  newTaskContainer.appendChild(newTask)
  newTaskContainer.appendChild(deleteButton)
  if (NEW_TASKS_AT_TOP === false){
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
    if (attTypes[i] === 'class'){ // can have multiple classes
      elem.classList.add(attValues[i])
    }
    else elem.setAttribute(attTypes[i], attValues[i])
  }
}
