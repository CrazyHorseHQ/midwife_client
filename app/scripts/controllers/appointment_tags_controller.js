SmartClient.AppointmentTagsController = Ember.ArrayController.extend({
  needs: ['appointment'],

  // TODO FIXME do a better way of separating this two.
  selectedTags: (function() {
    var ids = this.get('content');
    return this.get('allTags').filter(function(item) {
      return ids.contains(parseInt(item.get('id')));
    })
  }).property('allTags.@each.id'),

  remainingTags: (function() {
    var ids = this.get('content');
    return this.get('allTags').filter(function(item) {
      return !ids.contains(parseInt(item.get('id')));
    })
  }).property('allTags.@each.id'),

  allTags: function() {
    return this.get('store').all('tag');
  }.property(),

  actions: {
    tag: function(tag_id) {
      var self = this;
      var appointment = self.get('controllers.appointment').get('model');
      var apt_tag = self.store.createRecord('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      });
      apt_tag.save().then(function() {
        self.transitionToRoute('appointment', appointment);
      }, function() {});
    },
    untag: function(tag_id) {
      var self = this;
      // FIXME this has a really hacky feeling for me...
      var appointment = self.get('controllers.appointment').get('model');
      var appointmentTagAdapter = this.container.lookup('adapter:appointment_tag');
      var apt_tag = self.store.createRecord('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      });
      appointmentTagAdapter.destroyRecord(self.get('store'), 'appointment_tag', apt_tag).then(function(){
        //Why is this not working?
        self.transitionToRoute('appointment', appointment);
      });
    },
  }
});

