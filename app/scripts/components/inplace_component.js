var EmberComponents = window.EmberComponents = Ember.Namespace.create();

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

EmberComponents.InplaceSelectField = EmberComponents.InplaceField.extend({
  click: function() {
    this._super();
    var select = Ember.Select.create({
      content: this.get('selectContent'),
      optionLabelPath: this.get('optionLabelPath'),
      optionValuePath: this.get('optionValuePath'),
      selectionBinding: this.get('contentBinding')
    });
    this.set('inputField', select);
  },

  focusOut: function () {
    this.set('content', this.get(this.get('optionValuePath')));
    this._super();
  }
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

SmartClient.InplaceSelect = EmberComponents.InplaceSelect = EmberComponents.InplaceSelectField.extend({
  inputField: Ember.Select.extend(EmberComponents.FocusSupport)
})
