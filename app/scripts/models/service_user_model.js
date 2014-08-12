/*global Ember*/
SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  appointments: DS.hasMany('Appointment'),

  gestation_period: function () {
    var earliest_conception = moment(this.get('clinical_fields').estimated_delivery_date).add('w', 2).subtract('w', 43)

    return moment(this.get('clinical_fields').estimated_delivery_date).diff(earliest_conception, 'weeks') + " weeks"
  }.property()
});

// probably should be mixed-in...
SmartClient.ServiceUser.reopen({
  attributes: function(){
    var model = this;
    var attrs = [];

    attrs = Ember.keys(this.get('data').clinical_fields).map(function(key){
      return Em.Object.create({ model: model, key: key, parentKey: 'clinical_fields', valueBinding: 'model.clinical_fields.' + key });
    });

    Ember.keys(this.get('data').personal_fields).map(function(key){
      attrs.push(Em.Object.create({ model: model, key: key, parentKey: 'personal_fields', valueBinding: 'model.personal_fields.' + key }));
    });

    attrs.push(Em.Object.create({ model: model, key: 'gestation_period', valueBinding: 'model.gestation_period' }));

    return attrs;
  }.property()
});
