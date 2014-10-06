SmartClient.ClinicAnnouncementsComponent = Ember.Component.extend({
  announcements: [],
  selectedDate: moment().format("YYYY-MM-DD"),

  filtered_list: function() {
    var announcements = this.get('announcements');

    if (announcements) {
      return announcements.filterBy('date', this.get('selectedDate'));
    }
  }.property('selectedDate', 'announcements.@each'),
});
