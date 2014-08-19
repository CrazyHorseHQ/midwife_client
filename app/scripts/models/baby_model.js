SmartClient.Baby = DS.Model.extend({
  hospital_number: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_user: DS.belongsTo('serviceUser')
});
