SmartClient.ServiceUserController = Ember.ObjectController.extend({
  needs: "application",

  home_types: [
    {value: 'house', label: 'house'},
    {value: 'apartment', label: 'apartment'},
    {value: 'mobile home', label: 'mobile home'}
  ],
  home_counties: [
    {value: 'Dublin', label: 'Dublin'},
    {value: 'Wicklow', label: 'Wicklow'}
  ],
  rhesus_types: [
    {label: 'Positive', value: true},
    {label: 'Negative', value: false}
  ],
  feeding_types: [
    {label: 'Breast', value: 'Breast'},
    {label: 'Bottle', value: 'Bottle'},
    {label: 'Mixed', value: 'Mixed'}
  ],
  birth_modes: [
    {label: 'Svd', value: 'Svd'},
    {label: 'Ventose', value: 'Ventose'},
    {label: 'Forceps', value: 'Forceps'},
    {label: 'Failed Ventose', value: 'Failed Ventose'},
    {label: 'Failed Forceps', value: 'Failed Forceps'},
    {label: 'LSCS', value: 'LSCS'}
  ],
  blood_groups: [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'AB', value: 'AB'},
    {label: '0', value: '0'}
  ],
  perineum_choices: [
    {label: "Intact", value: "Intact"},
    {label: "1 degree with sutures", value: "1 degree with sutures"},
    {label: "1 degree without sutures", value: "2 degree without sutures"},
    {label: "2 degree", value: "2 degree"},
    {label: "3 degree", value: "3 degree"},
    {label: "4 degree", value: "4 degree"}
  ],
  anti_d_choices: [
    {label: "No", value: "No"},
    {label: "Yes", value: "Yes"},
    {label: "Not Required", value: "Not Required"},
    {label: "Declined", value: "Declined"}
  ],
  vit_k_choices: [
    {label: "Oral", value: "Oral"},
    {label: "IM", value: "IM"},
    {label: "Declined", value: "Declined"}
  ],

  actions: {
    save: function(){
      var self = this
      var model = self.get('model')

      var new_edd = Ember.$('#estimated_delivery_date').val(),
          currentPregnancyModel = model.get('current_pregnancy');

      if (new_edd != currentPregnancyModel.get('estimated_delivery_date')) {
        currentPregnancyModel.set('estimated_delivery_date', new_edd)
        currentPregnancyModel.save()
      }

      model.save().then(function () {
        Ember.$('#su_success').show()
      }, function (resp) {
        self.setErrors(resp, "su_edit_errors")
      });
    },
    savePregnancy: function(pregnancyId) {
      var self = this
      self.get('store').find('pregnancy', pregnancyId).then(function(model) {

        var latest_mp = Ember.$('#last_menstrual_period').val()
        model.set('last_menstrual_period', latest_mp)

        model.save().then(function () {
          Ember.$('#su_success').show()
        }, function () {});
      });
    },
    saveBaby: function(babyId) {
      var self = this
      self.get('store').find('baby', babyId).then(function(model) {
        var dd = Ember.$('#delivery_date').val()
        var dt = Ember.$('#delivery_time').val()

        model.set(
          'delivery_date_time',
          moment(dd + 'T' + dt).format('YYYY-MM-DD HH:mm:ss')
        )
        model.save().then(function () {
          Ember.$('#su_success').show()
        }, function () {});
      });
    },
    close: function () {
      Ember.$('#su_success').hide()
    },
    new_appointment: function (su_id) {
      this.transitionToRoute('service_options')
    }
  }
});
