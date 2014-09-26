SmartClient.EditableMultiSelectComponent = SmartClient.EditableFieldComponent.extend({
  isEmpty: function () {
    return Ember.isEmpty(this.get('fieldContent'))
  }.property('selectedValues'),

  fieldContent: function () {
    var self = this
    var selectedObj = self.get('selectedValues');

    if (selectedObj) {
      var values = selectedObj.mapBy('label');
      return values.toArray().join(',');
    } else {
      return this.get('emptyValue')
    }
  }.property('selectedValues'),
});
