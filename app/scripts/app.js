var SmartClient = window.SmartClient = Ember.Application.create();
window.log = function (msg) {
  console.log(msg);
};

Ember.ObjectController.reopen({
  errorMessages: [],

  // setErrors
  // ---------
  //
  // Tell the controller to set up it's errorMessages property with
  // errors from the server
  //
  // resp {Object} the server response containg 'errors' key
  // errorElementId {String} the id of the error div, used as a unique scrollTo
  // model {DS.Model} the model to be removed from the store after unsuccessful save
  setErrors: function (resp, errorElementId, model) {
    var errorArray = []
    Ember.$.each(resp.errors, function (key, value) {
      errorArray.push({
        key: key,
        value: value
      })
    })

    this.set('errorMessages', errorArray)

    if (model) {
      model.deleteRecord()
    }

    Ember.$('html, body').animate({
      scrollTop: Ember.$("#" + errorElementId).offset().top - 80
    }, 500);
  }
})

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
