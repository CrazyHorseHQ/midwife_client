/*global Ember*/
MidwifeClient.Midwife = DS.Model.extend({
  name: DS.attr(),
  loginName: DS.attr(),
  active: DS.attr(),
  password: "********"
});

// probably should be mixed-in...
MidwifeClient.Midwife.reopen({
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
