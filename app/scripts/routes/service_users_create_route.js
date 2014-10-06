SmartClient.ServiceUsersCreateRoute = SmartClient.AuthenticatedRoute.extend({
  renderTemplate: function () {
    this.render('service_users/create', {
      into: 'application',
      outlet: 'content_column'
    })
  }
});
