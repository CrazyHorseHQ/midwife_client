SmartClient.Pregnancy = DS.Model.extend({
  estimated_delivery_date: DS.attr(),
  babies: DS.hasMany('baby'),
  service_user: DS.belongsTo('serviceUser')
});
