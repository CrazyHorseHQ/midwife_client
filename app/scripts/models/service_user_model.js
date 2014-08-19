SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  gestation: function () {
    pregnancies_content = this.get('pregnancies.content')
    var edd = moment(pregnancies_content[0].get('estimated_delivery_date'))

    if (moment().isBefore(moment(edd), 'd')) {
      var diff = Math.ceil(edd.diff(moment(), 'd', true))
      diff = (280 - diff) // 280 is 4 weeks

      if (diff % 7 === 0) {
        return Math.floor(diff / 7) + " weeks"
      } else if (diff < 7) {
        return (diff % 7) + " days"
      } else {
        return Math.floor(diff / 7) + " weeks " + (diff % 7) + " days"
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
