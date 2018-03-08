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
const NEW_TASKS_AT_BOTTOM = false

//*** STATE */
const state = {
  list: [],
  itemCounter: 0
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

//*** STATE FUNCS */
function setList (listArray) {
  state.list = listArray
}

function addToList (task) {
  state.list.push(task)
  let newTaskHolder = createAnElem('li')
  let newTask = createAnElem('p', task.value)
  newLi.appendChild(newTask)
  listContainer.appendChild(newTaskHolder)
}

function removeFromList (task) {
  let index = state.list.indexOf(task)
  let element = taskContainers[index]
  listContainer.removeChild(element)
  state.list.splice(index, 1)
}

//*** DOM MANIPULATION */

function createAnElem (elemType, text||'') {
  let newElem = document.createElement(elemType)
  let newTextNode = document.createTextNode(text)
  newElem.appendChild(newTextNode)
  return newElem
}
