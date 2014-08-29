SmartClient.AppointmentServiceOptionAdapter = SmartClient.ApplicationAdapter.extend({
  createRecord: function(store, type, record){
    var data = {id: record.get('service_option_id')};
    return this.ajax("%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id'))), "POST", { data: {service_option: data }});
  },
  destroyRecord: function(store, type, record){
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record.get('appointment_id')), record.get('service_option_id'));
    return this.ajax(url, "DELETE", { data: {}});
  },
  // TODO FIXME getting errors for:
  // not returning an array... not sure what to return here, all tutorials just return the AJAX result...
  findQuery: function(store, type, record) {
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record['appointment_id']), record['service_option_id']);
    return this.ajax(url, "GET", { data: {}});
  },
  baseUri: function(apt_id) {
    return "appointments/%@/service_options".fmt(apt_id);
  }
});
