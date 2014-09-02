var SmartClient = window.SmartClient = Ember.Application.create();
window.log = function (msg) {
  console.log(msg);
};

// no need to plurarise login
Ember.Inflector.inflector.uncountable('login');
Ember.Inflector.inflector.uncountable('logout');

/* Order and include as you please. */
require('scripts/config');
require('scripts/store');
require('scripts/adapters/*');
require('scripts/components/*');
require('scripts/controllers/*');
require('scripts/models/*');
require('scripts/routes/authenticated_route.js');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
