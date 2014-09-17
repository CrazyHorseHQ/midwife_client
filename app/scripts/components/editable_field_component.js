SmartClient.EditableFieldComponent = Ember.Component.extend({
  classNames: ['inplace_field'],
  classNameBindings: ['isEmpty:inplace_empty'],
  emptyValue: "Click to add content for this field",

  isEditing: false,

  isEmpty: function () {
    return Ember.isEmpty(this.get('content'))
  }.property('content'),

  focusOut: function () {
    this.set('isEditing', false)
  },

  click: function () {
    this.set('isEditing', true)
  },

  didInsertElement: function () {
    this.$().focus()
  }
});
