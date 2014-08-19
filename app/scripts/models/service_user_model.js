SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  gestation_period: function () {
    var edd = moment()

    if (moment() < moment(edd)) {
      return 40 - (moment(edd) - moment())
    }
  }.property()
});
