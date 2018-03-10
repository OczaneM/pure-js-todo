'use strict'

const Nav = {

  render: function () {
    app.appendChild(
      header({className: 'nav-header'}, null,
      h3(null, 'TODO'),
      nav(null, null,
        ul(null, null,
          li({id: 'createNav'}, null,
            a({href: ''}, 'create')
          ),
          li({id: 'searchNav'}, null,
            a({href: ''}, 'search')
          ),
          li({id: 'configureNav'}, null,
            a({href: ''}, 'configure')
          )
         )
        )
      )
    )
    this.checkActiveTab()
  },

  checkActiveTab: function () {
    switch (VIEW) {
      case 'createTab':
          document.getElementById('createNav').className = 'active'
          document.getElementById('searchNav').className = 'tab-control'
          document.getElementById('configureNav').className = 'tab-control'
          break
      case 'searchTab':
          document.getElementById('createNav').className = 'tab-control'
          document.getElementById('searchNav').className = 'active'
          document.getElementById('configureNav').className = 'tab-control'
          break
      case 'configure':
          document.getElementById('createNav').className = 'tab-control'
          document.getElementById('searchNav').className = 'tab-control'
          document.getElementById('configureNav').className = 'active'
          break
      default:
          break
    }
  }
}
