SmartClient.LoginAdapter = DS.RESTAdapter.extend({
  // TODO figure out a way to remove this duplication
  host: 'http://127.0.0.1:5000',
  createRecord: function(store, type, record) {
    var p = this._super(store, type, record);

    return p.then(function(data){
        record.set('id', data['login']['id']);
        record.set('token', data['login']['token']);
    });
  },
});
