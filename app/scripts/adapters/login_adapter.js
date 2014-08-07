SmartClient.LoginAdapter = SmartClient.ApplicationAdapter.extend({
  createRecord: function(store, type, record) {
    var p = this._super(store, type, record);

    return p.then(function(data){
        record.set('id', data['login']['id']);
        record.set('token', data['login']['token']);
    });
  },
});
