var SmartClient = window.SmartClient = Ember.Application.create();
window.log = function (msg) {
  console.log(msg);
};

var EmberComponents = window.EmberComponents = Ember.Namespace.create()

EmberComponents.InplaceField = Ember.View.extend({
  tagName: 'div',

  classNames: ['inplace_field'],
  classNameBindings: ['isEmpty:inplace_empty'],

  isEditing: false,

  isEmpty: function () {
    return Ember.isEmpty(this.get('content'))
  }.property('content'),
  emptyValue: "Click to add content for this field",

  layoutName: "inplace_field",

  focusOut: function () {
    this.set('isEditing', false)
  },
  click: function () {
    this.set('isEditing', true)
  },
});

EmberComponents.FocusSupport = Ember.Mixin.create({
  didInsertElement: function () {
    this.$().focus()
  }
})

SmartClient.InplaceTextField = EmberComponents.InplaceTextArea = EmberComponents.InplaceField.extend({
  inputField: Ember.TextArea.extend(EmberComponents.FocusSupport)
})

SmartClient.InplaceTextField = EmberComponents.InplaceTextField = EmberComponents.InplaceField.extend({
  type: 'text',
  inputField: Ember.TextField.extend(EmberComponents.FocusSupport)
})

// no need to plurarise login
Ember.Inflector.inflector.uncountable('login');
Ember.Inflector.inflector.uncountable('logout');

/* Order and include as you please. */
require('scripts/config');
require('scripts/store');
require('scripts/adapters/*');
require('scripts/controllers/*');
require('scripts/models/*');
require('scripts/routes/authenticated_route.js');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
