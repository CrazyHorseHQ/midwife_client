SmartClient.AboutRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('about', {
      into: 'application',
      outlet: 'content_column'
    })

    this.render('logo', {
      into: 'application',
      outlet: 'side_column'
    })
  }
});
