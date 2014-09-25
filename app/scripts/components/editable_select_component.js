SmartClient.EditableSelectComponent = SmartClient.EditableFieldComponent.extend({
  isEmpty: function () {
    return Ember.isEmpty(this.get('fieldContent'))
  }.property('selectValue'),

  fieldContent: function () {
    var self = this

    var selectedObj = self.get('selectContent').find(function(item, index, enumerable) {
      return item.value == self.get('selectValue')
    })

    return selectedObj ? selectedObj.label : this.get('emptyValue')
  }.property('selectValue')
});
