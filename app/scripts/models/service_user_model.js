SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  gestation: function () {
    pregnancies_content = this.get('pregnancies.content')
    var edd = moment(pregnancies_content[0].get('estimated_delivery_date'))

    log(moment().format() + "<" + moment(edd).format() + ": " + (moment().isBefore(moment(edd), 'd')))

    if (moment().isBefore(moment(edd), 'd')) {
      var diff = Math.ceil(edd.diff(moment(), 'd', true))
      log(diff + " days difference")

      if (diff % 7 === 0) {
        return (diff / 7) + " weeks"
      } else {
        return (diff % 7) + " days"
      }
    } else {
      return "T + " + Math.ceil(moment().diff(edd, 'd', true))
    }
  }.property('current_edd'),

  current_edd: function () {
    pregnancies_content = this.get('pregnancies.content')
    return pregnancies_content[0].get('estimated_delivery_date')
  }.property()
});
