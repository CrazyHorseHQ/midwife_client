SmartClient.ServiceOption = DS.Model.extend({
  name: DS.attr(),
  clinics: DS.hasMany('clinic', {async: true})
});
