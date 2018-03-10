'use strict'
const create = Object.create(Create)
const navigation = Object.create(Nav)
const eventDelegator = Object.create(EventDelegator)
const footerObj = Object.create(Footer)

// Check localStorage to populate current session list
if (localStorage.todoState) getListData()
else storeListData() // stores newly generated list on localStorage


const Main = {
  render: function () {
    eventDelegator.delegate() // add eventListeners to the DOM
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
    footerObj.render()
  }
}
