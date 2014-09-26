SmartClient.EditableMultiSelectComponent = SmartClient.EditableFieldComponent.extend({
  fieldContent: function () {
    var selectedObj = this.get('selectedValues');
    if (selectedObj) {
      var modes = selectedObj.map(function(item, index) {
        return item.label
      }).toArray().join(', ');
      this.set('selectValue', modes);
      return modes;
    }
    return this.get('emptyValue');
  }.property('selectedValues.@each.label'),
});
