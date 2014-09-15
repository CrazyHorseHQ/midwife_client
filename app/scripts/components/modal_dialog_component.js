SmartClient.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      return this.sendAction();
    },
  },
  rendered: function() {
    Ember.$('.modal').modal({
      keyboard: false,
      backdrop: 'static',
      show: true
    });
  }.on('didInsertElement'),
  removed: function() {
    Ember.$('.modal').modal('hide');
    Ember.$('body').removeClass('modal-open');
  }.on('willDestroyElement'),
});
