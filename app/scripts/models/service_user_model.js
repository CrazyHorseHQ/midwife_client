SmartClient.ServiceUser = DS.Model.extend({
  hospital_number: DS.attr(),
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  age: function () {
    return moment().diff(this.get('personal_fields.dob'), 'years');
  }.property(),

  current_pregnancy: function () {
    return this.get('pregnancies').sortBy('created_at').get('firstObject')
  }.property('pregnancies.@each'),

  previous_pregnancies: function () {
    var previous_pregnancies = this.get('pregnancies').filter(function (item, index, enumerable) {
      if (item.get('babies').find(function (item, index, enumerable) {
        if (item.get('delivery_date_time')) {
          return true
        }
      })) {
        return true
      }
    });

    return previous_pregnancies
  }.property('pregnancies.@each'),

  parity_list: function () {
    var compiled_pregnancies = {
      gestations: [],
      dobs: [],
      baby_genders: [],
      weights: [],
      birth_modes: []
    }

    this.get('previous_pregnancies').forEach(function (pregnancy) {
      compiled_pregnancies['gestations'].push(pregnancy.get('gestation'))
      compiled_pregnancies['birth_modes'].push(pregnancy.get('birth_mode'))

      pregnancy.get('babies').forEach(function (baby) {
        compiled_pregnancies['dobs'].push(baby.get('delivery_date'))
        compiled_pregnancies['baby_genders'].push(baby.get('gender'))
        compiled_pregnancies['weights'].push(baby.get('kg_weight'))
      });
    });

    return compiled_pregnancies
  }.property(),

  baby_age: function () {
    return this.get('current_pregnancy.baby_age')
  }.property(),

  gestation: function () {
    return this.get('current_pregnancy.gestation')
  }.property()
});
