SmartClient.ServiceUserRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('service_user', params.service_user_id);
  },

  renderTemplate: function () {
    this.render('service_user', {
      into: 'application',
      outlet: 'full_column'
    })
  }
});
