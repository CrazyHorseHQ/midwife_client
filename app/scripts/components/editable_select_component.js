SmartClient.EditableSelectComponent = SmartClient.EditableFieldComponent.extend({
  isMultiple: false,

  isEmpty: function () {
    return Ember.isEmpty(this.get('fieldContent'))
  }.property('selectedValues'),

  fieldContent: function () {
    var self = this
    var selectedObj = self.get('selectedValues');

    if (selectedObj) {
      if (self.get('isMultiple')) {
        var values = selectedObj.mapBy('label');
        return values.toArray().join(',');
      } else {
        return selectedObj.label;
      }
    } else {
      return this.get('emptyValue')
    }
  }.property('selectedValues'),
});
