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
const taskInput = document.getElementById(TASK_INPUT)
const listContainer = document.getElementById(LIST_CONTAINER)
const taskContainers = document.querySelectorAll(ALL_TASKS)

//*** DATA STORAGE FUNCS */
const getListData = () => {
  const data = JSON.parse(localStorage.todoState)
  setList(data)
}

const storeListData = () => {localStorage.todoState = JSON.stringify(state)}

//*** LIST FUNCS */
const setList = (data) => {
  state.list = data.list
  state.idCounter = data.idCounter
  state.itemCounter = data.itemCounter
}

const addTaskToList = (task) => {
  if (!state.list.find(elem => elem.id === task.id)) state.list.push(task)

  let newTaskContainer = createDomElem('li', {className: 'task-holder'})
  let newTask = createDomElem('p', {}, task.value)
  let checkbox = createDomElem('input', {type: 'checkbox', className: 'checkbox'})
  let deleteButton = createDomElem('i', {className: 'fas fa-trash-alt'})

  appendChildHelper(newTaskContainer, checkbox, newTask, deleteButton)

  if (NEW_TASKS_AT_TOP === false){
    listContainer.insertBefore(newTaskContainer, taskContainers.firstChild)
  }
  else listContainer.appendChild(newTaskContainer)
}

const appendChildHelper = (parent, ...children) =>
{
  for (let i = 0; i < children.length; i++){
    parent.appendChild(children[i])
  }
}

const removeTaskFromList = (task) => {
  let index = state.list.indexOf(task)
  removeDomElem(index)
  state.list.splice(index, 1)
}

const resetItemCounter = () => {state.itemCounter = 0}


//*** DOM MANIPULATION */

const createDomElem = (elemType, properties, text) => {
  let newElem = document.createElement(elemType)
  if (text) {
    let newTextNode = document.createTextNode(text)
    newElem.appendChild(newTextNode)
  }
  Object.keys(properties).forEach( prop => {
    newElem[prop] = properties[prop]
  })
  return newElem
}

const removeDomElem = (elemIndex) => {
  let element = taskContainers[elemIndex]
  listContainer.removeChild(element)
}
