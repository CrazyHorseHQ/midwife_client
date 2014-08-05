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
      var appointment = self.get('controllers.appointment').get('model');
      var apt_tag = self.store.find('appointment.tag', {
        tag_id: tag_id,
        appointment_id: appointment.get('id')
      }).then(function(record){
        console.log(record);
        apt_tag.destroyRecord();
        apt_tag.save().then(function() {
          self.transitionToRoute('appointment', appointment);
        }, function() {});
      });
    },
  }
});

