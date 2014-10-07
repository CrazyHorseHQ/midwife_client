SmartClient.AnnouncementAdapter = SmartClient.ApplicationAdapter.extend({
  createRecord: function(store, type, record){
    var data = {
      date: record.get('date'),
      note: record.get('note'),
      blocking: record.getWithDefault('blocking', false)
    };
    return this.ajax("%@/%@".fmt(this.get('host'), this.baseUri(record.get('clinic.id'))), "POST", { data: {announcement: data }});
  },
  destroyRecord: function(store, type, record){
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record.get('clinic.id')), record.get('id'));
    return this.ajax(url, "DELETE", { data: {}});
  },
  // TODO FIXME getting errors for:
  // not returning an array... not sure what to return here, all tutorials just return the AJAX result...
  findQuery: function(store, type, record) {
    var url = "%@/%@/%@".fmt(this.get('host'), this.baseUri(record['clinic.id']), record['id']);
    return this.ajax(url, "GET", { data: {}});
  },
  baseUri: function(id) {
    return "clinics/%@/announcements".fmt(id);
  }
});
