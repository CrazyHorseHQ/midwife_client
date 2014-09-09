SmartClient.Baby = DS.Model.extend({
  hospital_number: DS.attr(),
  name: DS.attr(),
  gender: DS.attr(),
  weight: DS.attr(),
  vitamin_k: DS.attr(),
  hearing: DS.attr(),
  newborn_screening_test: DS.attr(),
  delivery_date_time: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_user: DS.belongsTo('serviceUser')
});
