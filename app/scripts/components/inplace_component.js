var EmberComponents = window.EmberComponents = Ember.Namespace.create();

EmberComponents.InplaceField = Ember.View.extend({
  customDisplay: false,
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

SmartClient.InplaceTextArea = EmberComponents.InplaceTextArea = EmberComponents.InplaceField.extend({
  inputField: Ember.TextArea.extend(EmberComponents.FocusSupport)
})

SmartClient.InplaceTextField = EmberComponents.InplaceTextField = EmberComponents.InplaceField.extend({
  type: 'text',
  inputField: Ember.TextField.extend(EmberComponents.FocusSupport)
})
