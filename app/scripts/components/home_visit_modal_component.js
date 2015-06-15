SmartClient.HomeVisitModalComponent = Ember.Component.extend({
  new_or_return: 'return',

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
        service_option: model,
        service_provider: sp,
        service_user: this.get('service_user'),
        priority: 'home-visit',
        visit_type: 'ante-natal',
        return_type: this.get('new_or_return'),
      });

      new_apt.save().then(function () {
        self.get('aptComponent').sendAction('closeModal')
        self.get('aptComponent').toggleProperty('forceToggle')
      }, function (data) {
        if (data.errors) {
          for (var key in data.errors) {
            alert(data.errors[key])
          }
        }
      });
    }
  }
});
