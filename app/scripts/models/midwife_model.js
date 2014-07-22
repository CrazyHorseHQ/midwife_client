/*global Ember*/
MidwifeClient.Midwife = DS.Model.extend({
  name: DS.attr(),
  login_name: DS.attr()
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
