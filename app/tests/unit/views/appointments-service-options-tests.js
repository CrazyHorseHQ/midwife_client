describe("SmartClient.AppointmentsServiceOptionView", function () {
  var controller, view;

  beforeEach(function () {
    Ember.run(function () {
      // If for some reason we want to isolate this, we can use
      // a sinon stub to intercept certain calls.
      controller = {
        selectedServiceOptionId: 1
      };
      view = SmartClient.AppointmentsServiceOptionView.create({
        controller: controller,
        context: controller,
        template: Ember.Handlebars.compile('{{isSelected}}')
      });
      view.appendTo('#mocha-fixture');
    });
  });

  it("item is selected", function () {
    Ember.run(function () {
      view.set('serviceOptionId', 1);
      view.get('isSelected').should.equal(true);
    });
  });

  it("item is not selected", function () {
    Ember.run(function () {
      view.set('serviceOptionId', 3);
      view.get('isSelected').should.equal(false);
    });
  });
});

