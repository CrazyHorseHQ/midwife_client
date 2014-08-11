SmartClient.AppointmentController = Ember.ObjectController.extend({
  // Implement your controller here.
  needs: 'appointment',

  // TODO FIXME do a better way of separating this two.
  selectedTags: (function() {
    var ids = this.get('model').get('tags').mapBy('id');
    return this.get('allTags').filter(function(item) {
      return ids.contains(item.get('id'));
    })
  }).property('model.tags.@each', 'allTags.@each'),

  remainingTags: (function() {
    var ids = this.get('model').get('tags').mapBy('id');
    return this.get('allTags').filter(function(item) {
      return !ids.contains(item.get('id'));
    })
  }).property('model.tags.@each', 'allTags.@each'),

  actions: {
    tag: function(tag_id) {
      var self = this;
      var appointment = self.get('model');
      var new_tag = self.store.getById('tag', parseInt(tag_id));
      var apt_tag = self.store.createRecord('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      });
      apt_tag.save().then(function() {
        self.get('model.tags').pushObject(new_tag);
      });
    },
    untag: function(tag_id) {
      var self = this;
      // FIXME this has a really hacky feeling for me...
      var appointment = self.get('model');
      var appointmentTagAdapter = this.container.lookup('adapter:appointment_tag');
      var apt_tag = self.store.createRecord('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      });
      appointmentTagAdapter.destroyRecord(self.get('store'), 'appointment_tag', apt_tag).then(function(){
        var tag_to_remove = self.store.getById('tag', parseInt(tag_id));
        appointment.get('tags').removeObject(tag_to_remove);
      });
    },
    delete: function(){
      appointment = this.get('model');
      appointment.destroyRecord();
      appointment.save();

      this.transitionToRoute('appointments');
    }
  }
});

