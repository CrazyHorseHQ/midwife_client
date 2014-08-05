SmartClient.AppointmentTagAdapter = DS.RESTAdapter.extend({
  host: 'http://127.0.0.1:5000',
  createRecord: function(store, type, record){
    var data = {id: record.get('tag_id')};
    return this.ajax("%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id'))), "POST", { data: {tag: data }});
  },
  destroyRecord: function(store, type, record){
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id')), record.get('tag_id'));
    return this.ajax(url, "DELETE", { data: {}});
  },
  findQuery: function(store, type, record) {
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record['appointment_id']), record['tag_id']);
    return this.ajax(url, "GET", { data: {}});
  },
  baseUri: function(apt_id) {
    return "appointments/%@/tags".fmt(apt_id);
  }
});
