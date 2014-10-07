SmartClient.DateFieldComponent = Ember.TextField.extend({
  classNames: ['form-control', 'date-input'],

  valueUpdated: function () {
    var date = moment(this.get('value'), 'DD/MM/YYYY').format('YYYY-MM-DD');

    this.set('selectedDate', date);
  }.observes('value'),

  selectedDateUpdated: function () {
    var date = moment(this.get('selectedDate'), 'YYYY-MM-DD').format('DD/MM/YYYY');

    this.set('value', date);
  }.observes('selectedDate'),

  didInsertElement: function () {
    var picker = new Pikaday({
      field: this.$()[0],
      format: 'DD/MM/YYYY'
    });

    this.set('value', moment(this.get('selectedDate'), 'YYYY-MM-DD').format('DD/MM/YYYY'))
  }
});
