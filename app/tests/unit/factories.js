var Factories = {
  store: null,

  setup: function() {
    this.store = SmartClient.__container__.lookup('store:main');
  },

  teardown: function() {
    // this.store.destroy();
  },

  create: function(type, hash) {
    var klass = this.store.modelFor(type);
    if (!klass) throw 'Unknown factory class';
    // if (typeof klass.createRecord !== 'function') throw 'Class is not a DS.Model';

    var defaults = SmartClient.Factories[type.camelize()],
        model    = this.store.createRecord(klass, defaults);

    if (hash) model.setProperties(hash);
    return model;
  }
};

/* //example
Factories.app = {
  name:      'foo',
  platform:  'iOS'
};
*/

export default Factories;
