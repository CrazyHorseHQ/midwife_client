SmartClient.AppointmentSerializer = DS.ActiveModelSerializer.extend({
  serialize: function(record, options) {
    var json = {};
    record.eachAttribute(function(name) {
      json[name] = record.get(name);
    });

    //setup the relations
    json['service_option_id'] = record.get('service_option.id');
    json['service_user_id'] = record.get('service_user.id');
    json['service_provider_id'] = record.get('service_provider.id');
    // Delete
    delete json.visit_logs;
    delete json.service_option_ids;
    delete json.pregnancy_notes;

    return json;
  },
});
