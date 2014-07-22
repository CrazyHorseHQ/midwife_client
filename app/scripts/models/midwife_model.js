/*global Ember*/
MidwifeClient.Midwife = DS.Model.extend({});

// probably should be mixed-in...
MidwifeClient.Midwife.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
        model: model,
        key: key,
        val: model.get('data')[key],
        valueBinding: 'model.' + key });
    });
  }.property()
});
