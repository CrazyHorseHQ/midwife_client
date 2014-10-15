SmartClient.ClinicController = Ember.ObjectController.extend({
  forceToggle: false,

  actions: {
    openModal: function (modalName, controller) {
      this.send('openModalWindow', modalName, controller)
    },
    closeModal: function () {
      this.send('closeModalWindow')
    }
  }
});
