SmartClient.Clinic = DS.Model.extend({
  name: DS.attr(),
  address: DS.attr(),
  opening_time: DS.attr(),
  closing_time: DS.attr(),
  recurrence: DS.attr(),
  type: DS.attr(),
  appointment_interval: DS.attr(),
  days: DS.attr(),
  appointments: DS.hasMany('appointment')
});
