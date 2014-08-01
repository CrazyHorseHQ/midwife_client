/*global Ember*/
SmartClient.Tag = DS.Model.extend({
    name: DS.attr('string')
});

// probably should be mixed-in...
SmartClient.Tag.reopen({
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

