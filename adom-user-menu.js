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
      }
    },
    _clickArrow: function() {
      this.fire('user-menu-click-arrow');
    },
    _showIconArrow: function() {
      var arrow = this.$$('#arrow');
      if(this.iconArrow === '') {
        arrow.hidden = true;
      }
    }

  });
}());