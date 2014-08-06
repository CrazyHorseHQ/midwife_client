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
      var apt_tag = self.store.createRecord('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      });
      apt_tag.save().then(function() {
        var tags = self.get('model.tags');
        tags.pushObject(parseInt(tag_id));
        self.set('model.tags', tags);
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
        var tags = appointment.get('tag_ids');
        tags = tags.filter(function(tag){
          return tag != tag_id
        });
        appointment.set('tag_ids', tags);
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

