(function () {
  'use strict';
  Polymer({

    is: 'adom-user-menu',

    properties: {
      name: {
        type: String
      },
      lastName: {
        type: String,
      },
      urlImage: {
        type: String
      },
      iconArrow: {
        type: String,
        value: '',
        observer: '_showIconArrow'
      },
      iconClose: {
        type: String,
        value: '',
        observer: '_showclose'
      },
      menu: {
        type: Array,
        value: function() {
          return [];
        }
      },
      user: {
        type: Array,
        value: function() {
          return [];
        }
      },
      userMenu: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      opened: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    },
    _clickArrow: function() {
      this.userMenu = !this.userMenu;
      this.fire('user-menu-click-arrow');
    },
    _showIconArrow: function() {
      var arrow = this.$$('#arrow');
      if(this.iconArrow === '') {
        arrow.hidden = true;
      }
    },
    _showclose: function() {
      var close = this.$$('#close');
      if(this.iconClose === '') {
        close.hidden = true;
      }
    },
    _open: function() {
      this.opened = true;
      this.fire('adom-user-menu-open');
    },
    _close: function() {
      this.opened = false;
      this.fire('adom-user-menu-close');
    },
    _toogle: function() {
      this.opened = !this.opened;
      this.fire('adom-user-menu-toogle')
    },
    _userClick: function(e) {
      var model = e.model;
      this.fire('adom-user-menu-click-user', model.item.label);
    },
    _menuClick: function(e) {
      var model = e.model;
      this.fire('adom-user-menu-click-menu', model.item.label);
    }

  });
}());