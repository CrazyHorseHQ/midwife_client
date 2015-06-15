SmartClient.ServiceOption = DS.Model.extend({
  name: DS.attr(),
  home_visit: DS.attr(),
  clinics: DS.hasMany('clinic', {async: true})
});
