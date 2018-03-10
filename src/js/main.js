'use strict'
const create = Object.create(Create)
const navigation = Object.create(Nav)
// Check localStorage to populate current session list
window.onload = function () {
  if (localStorage.todoState) {
    getListData()

    // Populate List
    create.populateList()
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
  }
}
