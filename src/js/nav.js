'use strict'

const Nav = {
  render: function () {
    header({className: 'nav-header'}, null,
      h3(null, 'TODO'),
      nav(null, null,
        ul(null, null,
          li({className: 'active'}, null,
            a({href: ''}, 'create')
          ),
          li({className: 'active'}, null,
            a({href: ''}, 'search')
          ),
          li({className: 'active'}, null,
            a({href: ''}, 'configure')
          )
        )
      )
    )
  }
}
