SmartClient.ServiceUsersCreateController = Ember.ObjectController.extend({
  homeTypeOptions: [{type: 'house'}, {type: 'apartment'}, {type: 'mobile home'}],
  homeCountyOptions: [{type: 'Dublin'}, {type: 'Wicklow'}],

  actions: {
    submit: function () {
      var self = this;

      var new_service_user = this.store.createRecord('service_user', {
        hospital_number: self.get('hospital_number'),
        personal_fields: {
          name: self.get('name'),
          email: self.get('email'),
          home_address: self.get('home_address'),
          home_type: self.get('home_type'),
          home_county: self.get('home_county'),
          home_post_code: self.get('home_post_code'),
          directions: self.get('directions'),
          home_phone: self.get('home_phone'),
          mobile_phone: self.get('mobile_phone'),
          next_of_kin_phone: self.get('next_of_kin_phone'),
          dob: self.get('dob')
        },
        clinical_fields: {
          estimated_delivery_date: self.get('estimated_delivery_date'),
          blood_group: self.get('blood_group')
        }
      });

      new_service_user.save().then(function () {
        self.setProperties({
          'name': '',
          'email': '',
          'home_address': '',
          'home_type': '',
          'home_county': '',
          'home_post_code': '',
          'directions': '',
          'hospital_number': '',
          'home_phone': '',
          'mobile_phone': '',
          'next_of_kin_phone': '',
          'estimated_delivery_date': '',
          'dob': '',
          'blood_group': ''
        });
        self.transitionToRoute('service_users');
      }, function (resp) {
        new_service_user.transitionTo('created.uncommitted')
        self.setErrors(resp, "su_errors", new_service_user)
      });
    }
  }
});
