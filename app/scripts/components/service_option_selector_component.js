SmartClient.ServiceOptionSelectorComponent = Ember.Component.extend({
  actions: {
    serviceOptionSelected: function (so_id) {
      this.sendAction('serviceOptionSelected', so_id)
    },
  }
});
