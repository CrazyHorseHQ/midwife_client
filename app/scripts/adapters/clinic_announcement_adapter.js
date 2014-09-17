SmartClient.ClinicAnnouncementAdapter = SmartClient.ApplicationAdapter.extend({
  createRecord: function(store, type, record){
    var data = {id: record.get('announcement_id')};
    return this.ajax("%@/%@".fmt(this.get('host'), this.baseUri(record.get('clinic_id'))), "POST", { data: {announcement: data }});
  },
  destroyRecord: function(store, type, record){
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record.get('clinic_id')), record.get('announcement_id'));
    return this.ajax(url, "DELETE", { data: {}});
  },
  // TODO FIXME getting errors for:
  // not returning an array... not sure what to return here, all tutorials just return the AJAX result...
  findQuery: function(store, type, record) {
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record['clinic_id']), record['announcement_id']);
    return this.ajax(url, "GET", { data: {}});
  },
  baseUri: function(id) {
    return "clinics/%@/announcements".fmt(id);
  }
});
