SmartClient.ServiceProvider = DS.Model.extend({
  name: DS.attr(),
  username: DS.attr(),
  active: DS.attr(),
  password: DS.attr(),

  activated_text: function () {
    return this.get('active') ? "Deactivate" : "Activate"
  }.property("active")
});

// probably should be mixed-in...
SmartClient.ServiceProvider.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
        model: model,
        key: key,
        valueBinding: 'model.' + key });
    });
  }.property()
});
