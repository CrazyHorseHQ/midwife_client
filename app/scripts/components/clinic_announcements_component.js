SmartClient.ClinicAnnouncementsComponent = Ember.Component.extend({
  addMode: false,

  filtered_list: function() {
    var announcements = this.get('clinic.announcements');

    if (announcements) {
      return announcements.filterBy('date', this.get('selectedDate'));
    }
  }.property('selectedDate', 'clinic.announcements.@each'),

  actions: {
    addAnnouncement: function () {
      var self = this;
      log(this.get('blocking'));

      var new_announcement = this.get('store').createRecord('announcement', {
        date: this.get('selectedDate'),
        note: this.get('note'),
        blocking: this.get('blocking'),
        clinic: this.get('clinic')
      });

      new_announcement.save().then(function () {
        self.toggleProperty('addMode')
        self.sendAction('addAnnouncement')
      });
    },
    toggleAddMode: function() {
      this.set('addMode', true);
    },
  },
});
