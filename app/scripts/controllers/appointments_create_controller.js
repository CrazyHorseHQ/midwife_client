MidwifeClient.AppointmentsCreateController = Ember.ObjectController.extend({
  needs: 'appointment',
  actions: {
    submit: function () {
      //this.transitionToRoute('appointment',this.get('model'));
      log("save here");
      log(this.get('model'));
      this.get('model').save();
    }
  }
});
