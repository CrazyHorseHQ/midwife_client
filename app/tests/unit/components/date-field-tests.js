describe("SmartClient.DateFieldComponent", function () {
  var component, model;

  beforeEach(function () {
    Ember.run(function () {
      component = SmartClient.DateFieldComponent.create({
        selectedDate: "2014-12-12",
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("should update value on selectedDate change", function() {
    Ember.run(function () {
      component.set('selectedDate', "2014-10-11");
      component.get('value').should.equal("11/10/2014");
    });
  });

  it("should update selectedDate on value change", function() {
    Ember.run(function () {
      component.set('value', "10/04/2014");
      component.get('selectedDate').should.equal("2014-04-10");
    });
  });
});

