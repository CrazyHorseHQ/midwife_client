describe("SmartClient.EditableMultiSelectComponent", function () {
  var component, model;

  beforeEach(function () {
    Ember.run(function () {
      var content = [
          {label: "one"},
          {label: "two"},
          {label: "three"},
        ];
      component = SmartClient.EditableMultiSelectComponent.create({
        content: content,
        selectContent: content,
        selectValue: [],
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("should concatenate selected values", function() {
    Ember.run(function () {
      component.set('selectedValues', [{label: "One"}, {label: "Three"}]);
      component.get('fieldContent').should.equal("One, Three");
    });
  });
});

