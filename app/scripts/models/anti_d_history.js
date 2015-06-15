SmartClient.AntiDHistory = DS.Model.extend({
  anti_d: DS.attr(),
  created_at: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_provider: DS.belongsTo('serviceProvider'),

  formatted_time: function () {
    return moment(this.get('created_at')).format('HH:mm, DD/MM/YYYY')
  }.property()
});
