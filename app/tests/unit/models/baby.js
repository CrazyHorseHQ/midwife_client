describe("SmartClient.Baby", function () {
  var subject;

  it("has delivery date", function () {
    Ember.run(function () {
      subject = this.store.createRecord('baby' ,{
        delivery_date_time: '2014-12-12 12:12:12',
      });
      // Won't actually load until the end of the run-block.
      subject.get("delivery_date").should.equal("2014-12-12");
    });
  });

  it("has delivery time", function () {
    Ember.run(function () {
      subject = this.store.createRecord('baby' ,{
        delivery_date_time: '2014-12-12 12:12:12',
      });
      // Won't actually load until the end of the run-block.
      subject.get("delivery_time").should.equal("12:12");
    });
  });

  it("has days since birth", function () {
    Ember.run(function () {
      subject = this.store.createRecord('baby' ,{
        delivery_date_time: moment().subtract(29, 'days')
      });
      // Won't actually load until the end of the run-block.
      subject.get("days_since_birth").should.equal(29);
    });
  });

  it("doesn't have days since birth", function () {
    Ember.run(function () {
      subject = this.store.createRecord('baby' ,{});
      // Won't actually load until the end of the run-block.
      subject.get("days_since_birth").should.equal("Delivery date not set");
    });
  });

  it("has weight in Kg", function() {
    Ember.run(function() {
      subject = this.store.createRecord('baby', {
        weight: 3450
      });

      subject.get('kg_weight').should.equal(3.45);
    });
  });
});
