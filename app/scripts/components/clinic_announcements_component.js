SmartClient.ClinicAnnouncementsComponent = Ember.Component.extend({
  addMode: false,

  filtered_list: function() {
    var announcements = this.get('clinic.announcements');
    if (announcements) {
      return announcements.filterBy('date', this.get('selectedDate'));
    }
  }.property('selectedDate', 'clinic.announcements.@each', 'model'),

  didInsertElement: function() {
    this.setupNewNote();
  },

  setupNewNote: function() {
    this.set('model', this.get('store').createRecord('announcement', {
        date: this.get('selectedDate'),
        clinic: this.get('clinic')
      })
    );
    var clinic = this.get('clinic');
    var model = this.get('model');
    clinic.get('announcements').then(function() {
      clinic.get('announcements').addObject(model)
    });
  },

  actions: {
    addAnnouncement: function () {
      var self = this;

      var new_announcement = this.get('model').setProperties({
        note: this.get('note'),
        blocking: this.get('blocking')
      });

      new_announcement.save().then(function () {
        self.set('note', '');
        self.set('blocking', false);
        self.toggleProperty('addMode')
        self.sendAction('addAnnouncement')
        self.setupNewNote();
      });
    },
    toggleAddMode: function() {
      this.toggleProperty('addMode');
    },
  },
});
