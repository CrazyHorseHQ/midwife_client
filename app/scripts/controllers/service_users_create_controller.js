SmartClient.ServiceUsersCreateController = Ember.ObjectController.extend({
  actions: {
    submit: function () {
      var self = this

      var new_service_user = this.store.createRecord('service_user', {
        name: self.get('name'),
        email: self.get('email'),
        address: self.get('address'),
        directions: self.get('directions'),
        hospital_number: self.get('hospital_number'),
        home_phone: self.get('home_phone'),
        service_user_phone: self.get('service_user_phone'),
        partner_phone: self.get('partner_phone'),
        estimated_delivery_date: self.get('estimated_delivery_date')
      });

      new_service_user.save().then(function () {
        self.set('name', '')
        self.set('email', '')
        self.set('address', '')
        self.set('directions', '')
        self.set('hospital_number', '')
        self.set('home_phone', '')
        self.set('service_user_phone', '')
        self.set('partner_phone', '')
        self.set('estimated_delivery_date', '')
        self.transitionToRoute('service_users');
      }, function () {
        new_service_user.deleteRecord()
      });
    }
  }
});
