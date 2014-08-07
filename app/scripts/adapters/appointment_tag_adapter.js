SmartClient.AppointmentTagAdapter = SmartClient.ApplicationAdapter.extend({
  createRecord: function(store, type, record){
    var data = {id: record.get('tag_id')};
    return this.ajax("%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id'))), "POST", { data: {tag: data }});
  },
  destroyRecord: function(store, type, record){
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id')), record.get('tag_id'));
    return this.ajax(url, "DELETE", { data: {}});
  },
  // TODO FIXME getting errors for:
  // not returning an array... not sure what to return here, all tutorials just return the AJAX result...
  findQuery: function(store, type, record) {
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record['appointment_id']), record['tag_id']);
    return this.ajax(url, "GET", { data: {}});
  },
  baseUri: function(apt_id) {
    return "appointments/%@/tags".fmt(apt_id);
  }
});
