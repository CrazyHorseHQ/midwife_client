SmartClient.Baby = DS.Model.extend({
  hospital_number: DS.attr(),
  delivery_date_time: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_user: DS.belongsTo('serviceUser')
});
