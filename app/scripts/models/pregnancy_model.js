SmartClient.Pregnancy = DS.Model.extend({
  estimated_delivery_date: DS.attr(),
  additional_info: DS.attr(),
  birth_mode: DS.attr(),
  perineum: DS.attr(),
  gestation: DS.attr(),
  anti_d: DS.attr(),
  feeding: DS.attr(),
  last_menstrual_period: DS.attr(),
  created_at: DS.attr(),
  babies: DS.hasMany('baby'),
  anti_d_histories: DS.hasMany('antiDHistory'),
  notes: DS.hasMany('pregnancyNote', {async: true}),
  service_user: DS.belongsTo('serviceUser')
});
