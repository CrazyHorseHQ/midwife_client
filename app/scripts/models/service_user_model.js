/*global Ember*/
SmartClient.ServiceUser = DS.Model.extend({
  name: DS.attr(),
  email: DS.attr(),
  address: DS.attr(),
  directions: DS.attr(),
  hospital_number: DS.attr(),
  home_phone: DS.attr(),
  mobile_phone: DS.attr(),
  partner_phone: DS.attr(),
  estimated_delivery_date: DS.attr()
});

// probably should be mixed-in...
SmartClient.ServiceUser.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});
