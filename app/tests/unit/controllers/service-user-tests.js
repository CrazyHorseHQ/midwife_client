// Sample controller test.
describe("SmartClient.ServiceUserController", function () {
  var model, controller, server;

  before(function () {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
    $('.test-stub').remove();
  });

  beforeEach(function () {
    Ember.run(function () {
      // We could also fetch a model from our fixtures.
      this.store.find('service_user', 1);
      model = this.store.getById('service_user', 1);
      controller = SmartClient.ServiceUserController.create({
        content: model,
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("saves baby delivery date time to the SU", function () {
    Ember.run(function () {
      $('body').append('<input id="delivery_date" class="test-stub" type="hidden" value="2014-12-12"/>');
      $('body').append('<input id="delivery_time" class="test-stub" type="hidden" value="12:12:12"/>');

      controller.send('saveBaby', 1);

      this.store.find('baby', 1).then(function(baby) {
        baby.get('delivery_date_time').should.equal('2014-12-12 12:12:12');
      });
    });
  });

  it("saves pregnancy details to SU", function() {
    Ember.run(function() {
      $('body').append('<input id="last_menstrual_period" class="test-stub" type="hidden" value="2014-12-12"/>');
      controller.send('savePregnancy', 1);

      this.store.find('pregnancy', 1).then(function(p) {
        p.get('last_menstrual_period').should.equal('2014-12-12');
      });
    });
  });

  it("saves EDD on current pregnancy", function() {
    Ember.run(function() {
      $('body').append('<input id="estimated_delivery_date" class="test-stub" type="hidden" value="2014-12-15"/>');
      // Setup pregnancy
      this.store.find('pregnancy', 1).then(function(pregnancy) {
        server.autoRespond = true;
        server.autoRespondAfter = 100;
        var header = { "Content-Type": "application/json" };
        var pregPutResponse = '{ "pregnancy": { "id": 1, "estimated_delivery_date": "2014-12-15" } }';
        server.respondWith("PUT", "/pregnancies/1", [ 201, header, pregPutResponse ]);

        controller.send('save');
        pregnancy.get('estimated_delivery_date').should.equal('2014-12-15');
      });
    });
  });
});
