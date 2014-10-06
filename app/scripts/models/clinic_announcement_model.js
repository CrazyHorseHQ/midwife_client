SmartClient.ClinicAnnouncement = DS.Model.extend({
  note: DS.attr(),
  blocking: DS.attr(),
  date: DS.attr(),
  clinic: DS.belongsTo('clinic')
});
