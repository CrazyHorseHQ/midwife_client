SmartClient.ServiceProviderRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('service_provider', params.service_provider_id);
  },

  renderTemplate: function(controller) {
    var tpl_name = 'read_only_details';
    if (this.currentUser()['admin']) {
      tpl_name = 'editable_details'
    }
    this.render('service_provider', {
      outlet: 'service_provider',
      into: 'application'
    });

    this.render('service_providers/' + tpl_name, {
      outlet: 'spData',
      into: 'service_provider',
      controller: controller
    });
  },
});
