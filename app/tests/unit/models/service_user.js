describe("App.ServiceUser", function () {
  var subject;

  it("has age", function () {
    Ember.run(function () {
      subject = this.store.createRecord('service_user' ,{
        hospital_number: 'T9876543',
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
          name: "Jane"
        },
      });
      // Won't actually load until the end of the run-block.
      subject.get("age").should.equal(29);
    });
  });

  it("has current_pregnancy", function() {
    Ember.run(function () {
      subject = this.store.createRecord('service_user' ,{
        hospital_number: 'T9876543',
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
          name: "Jane"
        },
      });

      var pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2014-12-12"
      });

      subject.get('pregnancies').pushObject(pregnancy);
      // Won't actually load until the end of the run-block.
      subject.get("current_pregnancy").should.equal(pregnancy);
    });
  });

  it("has gestation", function() {
    Ember.run(function () {
      subject = this.store.createRecord('service_user' ,{
        hospital_number: 'T9876543',
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
          name: "Jane"
        },
      });

      var pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2014-12-12",
        gestation: "20 + 1"
      });

      subject.get('pregnancies').pushObject(pregnancy);
      // Won't actually load until the end of the run-block.
      subject.get("gestation").should.equal("20 + 1");
    });
  });

  it("has previous_pregnancies", function() {
    Ember.run(function () {
      subject = this.store.createRecord('service_user' ,{
        hospital_number: 'T9876543',
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
          name: "Jane"
        },
      });

      var curr_pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2014-12-12"
      });
      var old_pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2012-12-12"
      });
      var baby = this.store.createRecord('baby', {
        delivery_date_time: "2012-12-12 12:12:12"
      });
      old_pregnancy.get('babies').pushObject(baby);

      subject.get('pregnancies').pushObject(curr_pregnancy);
      subject.get('pregnancies').pushObject(old_pregnancy);
      // Won't actually load until the end of the run-block.
      subject.get("previous_pregnancies")[0].should.equal(old_pregnancy);
    });
  });

  it("has parity_list", function() {
    Ember.run(function () {
      subject = this.store.createRecord('service_user' ,{
        hospital_number: 'T9876543',
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
          name: "Jane"
        },
      });

      var curr_pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2014-12-12",
        gestation: "36 + 1"
      });
      var old_pregnancy = this.store.createRecord('pregnancy', {
        estimated_delivery_date: "2012-12-12",
        birth_mode: "Svd",
        gestation: "36 + 1"
      });
      var baby = this.store.createRecord('baby', {
        delivery_date_time: "2012-12-12 12:12:12",
        gender: "male",
        weight: 3450,
        dob: "2012-12-12"
      });
      old_pregnancy.get('babies').pushObject(baby);

      subject.get('pregnancies').pushObject(curr_pregnancy);
      subject.get('pregnancies').pushObject(old_pregnancy);
      // Won't actually load until the end of the run-block.
      var pl = subject.get("parity_list");
      pl.gestations[0].should.equal("36 + 1");
      pl.dobs[0].should.equal("2012-12-12");
      pl.baby_genders[0].should.equal("male");
      pl.weights[0].should.equal(3.45);
      pl.birth_modes[0].should.equal("Svd");
    });
  });
});
