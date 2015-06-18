SmartClient.PregnancyAction = DS.Model.extend({
  action: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy'),
  service_provider: DS.belongsTo('serviceProvider'),
  created_at: DS.attr(),
  complete: DS.attr(),

  formatted_time: function () {
    return moment(this.get('created_at')).format('HH:mm, DD/MM/YYYY')
  }.property(),

  action_normalized: function () {
    return this.get('action').replace(/ /g,'')
  }.property()
});
