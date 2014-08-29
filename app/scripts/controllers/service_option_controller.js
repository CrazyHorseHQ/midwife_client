SmartClient.ServiceOptionController = Ember.ObjectController.extend({
  actions: {
    loadClinics: function () {
      this.get('store').find("clinic", {ids: model.clinic_ids});
    }
  }
});
