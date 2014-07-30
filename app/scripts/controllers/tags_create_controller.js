SmartClient.TagsCreateController = Ember.ObjectController.extend({
  needs: 'tag',
  actions: {
    submit: function(){
      var self = this;

      var new_tag = this.store.createRecord('tag', {
        name: self.get('name')
      });

      new_tag.save().then(function () {
        self.set('name', '')
        self.transitionToRoute('tags');
      }, function () {
        new_tag.deleteRecord()
      });
    }
  }
});

