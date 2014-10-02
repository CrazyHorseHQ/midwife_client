SmartClient.ClinicController = Ember.ObjectController.extend({
  actions: {
    openBookingModal: function (modalName, controller) {
      this.send('openModal', modalName, controller)
    },
    closeBookModal: function () {
      this.send('closeModal')
    }
  }
});
