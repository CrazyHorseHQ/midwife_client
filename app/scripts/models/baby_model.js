SmartClient.Baby = DS.Model.extend({
  hospital_number: DS.attr(),
  name: DS.attr(),
  gender: DS.attr(),
  weight: DS.attr(),
  vit_k: DS.attr(),
  hearing: DS.attr(),
  newborn_screening_test: DS.attr(),
  birth_outcome: DS.attr(),
  delivery_date_time: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_user: DS.belongsTo('serviceUser'),
  vit_k_histories: DS.hasMany('vitKHistory', {async: true}),

  delivery_date: function () {
    return moment(this.get('delivery_date_time')).format("YYYY-MM-DD");
  }.property(),

  delivery_time: function () {
    return moment(this.get('delivery_date_time')).utc().format("HH:mm");
  }.property(),

  days_since_birth: function () {
    return this.get('pregnancy.baby_age');
  }.property('pregnancy'),

  kg_weight: function () {
    return this.get('weight') / 1000
  }.property('weight')
});
