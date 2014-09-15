SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  gestation: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  age: function () {
    return moment().diff(this.get('personal_fields.dob'), 'years');
  }.property(),

  rhesus_text: function () {
    var rhesus = this.get('clinical_fields.rhesus')

    return rhesus === true ? 'Positive' : 'Negative'
  }.property(),

  current_pregnancy: function () {
    return this.get('pregnancies').sortBy('created_at').get('firstObject')
  }.property()
});
