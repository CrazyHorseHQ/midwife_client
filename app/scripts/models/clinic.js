/*global Ember*/
SmartClient.Clinic = DS.Model.extend({
  name: DS.attr(),
  address: DS.attr(),
  recurrence: DS.attr(),
  opening_time: DS.attr(),
  closing_time: DS.attr(),
  days: DS.attr(),

  aggr_times: function() {
    var opening = moment(this.get('opening_time'), "hh:mm:ss").format("hh:mm a")
        closing = moment(this.get('closing_time'), "hh:mm:ss").format("hh:mm a");
    return opening + " - " + closing;
  }.property('opening_time', 'closing_time'),
});

// probably should be mixed-in...
SmartClient.Clinic.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

