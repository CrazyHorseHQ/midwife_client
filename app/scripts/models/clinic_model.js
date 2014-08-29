SmartClient.Clinic = DS.Model.extend({
  name: DS.attr(),
  address: DS.attr(),
  opening_time: DS.attr(),
  closing_time: DS.attr(),
  recurrence: DS.attr(),
  days: DS.attr(),
});
