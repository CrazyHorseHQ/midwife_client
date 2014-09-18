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
  service_user: DS.belongsTo('serviceUser'),

  delivery_date: function () {
    return moment(this.get('delivery_date_time')).format("YYYY-MM-DD");
  }.property(),

  delivery_time: function () {
    return moment(this.get('delivery_date_time')).format("HH:mm");
  }.property(),

  days_since_birth: function () {
    var ddt = this.get('delivery_date_time')

    if (ddt) {
      return moment().diff(ddt, 'days')
    } else {
      return "Delivery date not set"
    }
  }.property(),

  kg_weight: function () {
    return this.get('weight') / 1000
  }.property('weight')
});
