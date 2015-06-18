SmartClient.ServiceUserPregnancyActionController = Ember.ObjectController.extend({
  service_user_actions: function () {
    return this.get('store').find('service_user_action')
  }.property(),

  actions: {
    create_action: function (short_code) {
      var new_pa = this.get('store').createRecord('pregnancyAction', {action: short_code})
      this.get('model.current_pregnancy.pregnancy_actions').pushObject(new_pa).save().then(function (resp) {
        Ember.$('[data-sua=' + resp.get('action_normalized') + ']').removeClass('btn-info').addClass('btn-success')
      })
    }
  }
});
