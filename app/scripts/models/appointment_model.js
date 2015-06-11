SmartClient.Appointment = DS.Model.extend({
  //model attr here
  date: DS.attr(),
  time: DS.attr(),
  service_option_id: DS.attr(),
  service_option: DS.belongsTo('ServiceOption', {async: true}),
  service_provider_id: DS.attr(),
  service_provider: DS.belongsTo('ServiceProvider', {async: true}),
  service_user_id: DS.attr(),
  clinic_id: DS.attr(),
  service_user: DS.belongsTo('serviceUser', {async: true}),
  clinic: DS.belongsTo('clinic'),
  priority: DS.attr(),
  visit_type: DS.attr(),
  attended: DS.attr(),
  return_type: DS.attr(),
  visit_logs: DS.attr(),
  service_option_ids: DS.attr(),
  service_options: DS.hasMany('serviceOption', {async: true}),

  // Allow deletion if entry is in the future
  canDelete: function() {
    return this.get('date') > moment().format('YYYY-MM-DD');
  }.property('date'),

  //
  calendarDateTime: function() {
    return moment(this.get('date')+this.get('time'), "YYYY-MM-DDhh:mm:ss").calendar();
  }.property('date'),

  isDropIn: function() {
    return this.get('priority') == 'drop-in';
  }.property('priority'),

  isHomeVisit: function() {
    return this.get('priority') == 'home-visit';
  }.property('priority'),
});

// probably should be mixed-in...
SmartClient.Appointment.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
        model: model,
        key: key,
        valueBinding: 'model.' + key });
    });
  }.property(),
});
