SmartClient.EditableMultiSelectComponent = SmartClient.EditableFieldComponent.extend({
  fieldContent: function () {
    var selectedObj = this.get('selectedValues');
    if (selectedObj) {
      var content = selectedObj.map(function(item, index) {
        return item.label
      }).toArray().join(', ');
      this.set('content', content);
      return content;
    }
    return this.get('emptyValue');
  }.property('selectedValues.@each.label'),
});
