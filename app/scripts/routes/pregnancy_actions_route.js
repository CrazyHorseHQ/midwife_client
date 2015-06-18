SmartClient.PregnancyActionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    return this.get('store').find('pregnancy_action')
  },

  renderTemplate: function () {
    this.render('pregnancy_actions', {
      into: 'application',
      outlet: 'full_column'
    })
  }
})
