/*global Ember*/
SmartClient.AppointmentServiceOption = DS.Model.extend({
    appointment_id: DS.attr(),
    service_option_id: DS.attr()
});

// probably should be mixed-in...
SmartClient.AppointmentServiceOption.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
        model: model,
        key: key,
        valueBinding: 'model.' + key });
    });
  }.property(),
});

