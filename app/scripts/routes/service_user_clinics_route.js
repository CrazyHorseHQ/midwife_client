SmartClient.ServiceUserClinicsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var so = this.modelFor('serviceUserServiceOption')

    return this.store.find('clinic', {ids: so.clinic_ids});
  }
});
