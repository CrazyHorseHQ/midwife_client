SmartClient.ServiceOptionController = Ember.ObjectController.extend({
  needs: ['service_options'],
  actions: {
    openModal: function (modalName, controller) {
      this.send('openModalWindow', modalName, controller)
    },
    closeModal: function () {
      this.send('closeModalWindow')
    }
  }
});
