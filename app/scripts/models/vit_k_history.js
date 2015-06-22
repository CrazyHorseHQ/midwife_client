SmartClient.VitKHistory = DS.Model.extend({
  vit_k: DS.attr(),
  created_at: DS.attr(),
  baby: DS.belongsTo('baby'),
  service_provider: DS.belongsTo('serviceProvider'),

  formatted_time: function () {
    return moment(this.get('created_at')).format('HH:mm, DD/MM/YYYY')
  }.property()
});
