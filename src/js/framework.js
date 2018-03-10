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

//*** STATE FUNCTS */
const setState = (newState) => {
  Object.keys(newState).forEach(key => {
    state[key] = newState[key]
  })
}

//*** DATA STORAGE FUNCS */
const getListData = () => {
  const data = JSON.parse(localStorage.todoState)
  setState(data)
}

const storeListData = () => {localStorage.todoState = JSON.stringify(state)}

const addTaskToList = (task) => {
  state.list = [...state.list, task]
}

const removeTaskFromList = (task) => {
  let index = state.list.indexOf(task)
  state.list.splice(index, 1)
}

const getState = () => state

//*** DOM MANIPULATION */
const createDomElem = (elemType, properties, text, ...children) => {
  const newElem = document.createElement(elemType)
  if (text){
    const textNode = document.createTextNode(text)
    newElem.appendChild(textNode)
  }
  if (properties){
    Object.keys(properties).forEach(prop => {
      if (prop === 'onsuccess') { // setting non-standard attibute
        newElem.setAttribute('data-onsuccess', 'onSignIn')
      }
      newElem[prop] = properties[prop]
    })
  }
  if (children.length > 0){
    appendChildrenHelper(newElem, ...children)
  }
  return newElem;
}

const removeDomElem = (parent, child) => {
  parent.removeChild(child)
}

const appendChildrenHelper = (parent, ...children) => {
  for (let i = 0; i < children.length; i++){
    parent.appendChild(children[i])
  }
}

//*** ELEMENTS */
const div = (...args) => createDomElem('div', ...args)
const p = (...args) => createDomElem('p', ...args)
const li = (...args) => createDomElem('li', ...args)
const ul = (...args) => createDomElem('ul', ...args)
const input = (...args) => createDomElem('input', ...args)
const i = (...args) => createDomElem('i', ...args)
