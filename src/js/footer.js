'use strict'

const Footer = {
  render: function () {
    app.appendChild(
      footer(null, null,
        div({id: 'total-uncomplete-items'}, state.itemCounter + ' items left')
      )
    )
  }
}
