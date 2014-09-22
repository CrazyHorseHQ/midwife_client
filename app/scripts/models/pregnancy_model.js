SmartClient.Pregnancy = DS.Model.extend({
  estimated_delivery_date: DS.attr(),
  additional_info: DS.attr(),
  birth_mode: DS.attr(),
  perineum: DS.attr(),
  gestation: DS.attr(),
  anti_d: DS.attr(),
  created_at: DS.attr(),
  babies: DS.hasMany('baby'),
  service_user: DS.belongsTo('serviceUser')
});
