/*global Ember*/
SmartClient.Login = DS.Model.extend({
  username: DS.attr(),
  password: DS.attr(),
  token: DS.attr()
});

// probably should be mixed-in...
SmartClient.Login.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

