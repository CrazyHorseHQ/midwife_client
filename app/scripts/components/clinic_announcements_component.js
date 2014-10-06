SmartClient.ClinicAnnouncementsComponent = Ember.Component.extend({
  addMode: false,
  clinic: false,
  selectedDate: moment().format("YYYY-MM-DD"),

  filtered_list: function() {
    var announcements = this.get('clinic.announcements');

    if (announcements) {
      return announcements.filterBy('date', this.get('selectedDate'));
    }
  }.property('selectedDate', 'clinic.announcements.@each'),

  actions: {
    addAnnouncement: function () {
      this.sendAction('addAnnouncement')
    },
    toggleAddMode: function() {
      this.set('addMode', true);
    },
  },
});
