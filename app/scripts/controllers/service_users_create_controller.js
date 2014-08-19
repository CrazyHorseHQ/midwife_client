SmartClient.ServiceUsersCreateController = Ember.ObjectController.extend({
  actions: {
    submit: function () {
      var self = this

      var new_service_user = this.store.createRecord('service_user', {
        personal_fields: {
          name: self.get('name'),
          email: self.get('email'),
          address: self.get('address'),
          directions: self.get('directions'),
          home_phone: self.get('home_phone'),
          mobile_phone: self.get('mobile_phone'),
          next_of_kin_phone: self.get('next_of_kin_phone'),
          dob: self.get('dob')
        },
        clinical_fields: {
          hospital_number: self.get('hospital_number'),
          estimated_delivery_date: self.get('estimated_delivery_date'),
          blood_group: self.get('blood_group')
        }
      });

      new_service_user.save().then(function () {
        self.setProperties({
          'name': '',
          'email': '',
          'address': '',
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
      }, function () {
        new_service_user.deleteRecord()
      });
    }
  }
});
