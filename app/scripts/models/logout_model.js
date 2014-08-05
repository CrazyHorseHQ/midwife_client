/*global Ember*/
SmartClient.Logout = DS.Model.extend({});

// probably should be mixed-in...
SmartClient.Logout.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

