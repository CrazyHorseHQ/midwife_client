SmartClient.PregnancyActionsController = Ember.ObjectController.extend({
  actions: {
    mark_complete: function (action_id) {
      this.get('store').find('pregnancy_action', action_id).then(function (model) {
        model.set('complete', true).save().then(function (resp) {
          Ember.$('[data-preg-action=' + resp.get('id') + ']').addClass('success')
        })
      })
    }
  }
})
