SmartClient.AppointmentRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      allTags: this.store.all('tag'),
      appointment: this.get('store').find('appointment', params.appointment_id)
    });
  },
  setupController: function(controller, model) {
    controller.set('content', model.appointment);
    controller.set('allTags', model.allTags);
  },
});

