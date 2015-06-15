SmartClient.AntiDHistory = DS.Model.extend({
  anti_d: DS.attr(),
  created_at: DS.attr(),
  pregnancy: DS.belongsTo('pregnancy')
});
