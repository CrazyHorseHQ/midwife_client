var SmartClient = window.SmartClient = Ember.Application.create();
window.log = function (msg) {
  console.log(msg);
};

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
