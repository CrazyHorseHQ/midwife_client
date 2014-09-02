SmartClient.ServiceUserClinicsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var so = this.modelFor('serviceUserServiceOption')

    return so.get('clinics')
  }
});
