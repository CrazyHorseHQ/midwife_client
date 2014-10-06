SmartClient.ServiceUsersRoute = SmartClient.AuthenticatedRoute.extend({
  model: function() {
    return this.get('store').find('service_user');
  },

  renderTemplate: function () {
    this.render('service_users', {
      into: 'application',
      outlet: 'side_column'
    })
  }
});
