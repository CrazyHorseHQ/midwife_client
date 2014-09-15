SmartClient.ApplicationRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    return [
      {label: 'Service Providers', resource: 'service_providers'},
      {label: 'Appointments', resource: 'appointments'},
      {label: 'Service Users', resource: 'service_users'},
      {label: 'Service Options', resource: 'service_options'}
    ];
  },

  destroySession: function(){
    var self = this;
    // Unload all the important models.
    ['serviceUser', 'serviceProvider', 'appointment'].forEach(function(type) {
      self.store.unloadAll(type);
    });
    localStorage.clear();
    self.transitionTo('login', {queryParams: {errorMsg: this.get('error')}});
  },

  actions: {
    search: function (searchString) {
      if (searchString) {
        if (searchString.match(/@[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)) {
          searchString = searchString.replace(/\//g, "-")
        }

        this.transitionTo('results', searchString)
      } else {
        alert("Please type a hospital number, date of birth or name")
      }
    },
    logout: function() {
      var self = this;
      this.store.createRecord('logout').save().then(function(result){
        self.destroySession();
      });
    },
    error: function(error, transition){
      if (error.status == 401) {
        this.set('error', "Your session is expired.");
        this.destroySession();
      }
    },
    //modal window actions
    openModal: function(modalName, controller, model) {
      if (Ember.isEmpty(controller)) {
        controller = this.controllerFor(modalName)
        controller.set('model', model);
      }
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal',
        controller: controller
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  }
});
