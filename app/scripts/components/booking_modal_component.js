SmartClient.BookingModalComponent = Ember.Component.extend({
  formattedDate: function () {
    return moment(this.get('selectedDate')).format('dddd, Do MMMM YYYY')
  }.property(),

  actions: {
    suChosen: function (service_user) {
      this.set('service_user', service_user)
    },
    searchAgain: function () {
      this.set('service_user', null)
    },
    bookServiceUser: function () {
      var sp = SmartClient.__container__.lookup('controller:application').get('currentUser')
      var self = this,
          model = self.get('model')

      var new_apt = this.get('store').createRecord('appointment', {
        date: this.get('selectedDate'),
        time: this.get('time'),
        service_provider: sp,
        service_user: this.get('service_user'),
        priority: 'scheduled',
        visit_type: 'ante-natal',
        clinic_id: model.get('id')
      });

      new_apt.save().then(function () {
        self.get('aptComponent').sendAction('closeBookModal')
        self.get('aptComponent').toggleProperty('forceToggle')
      });
    }
  }
});
