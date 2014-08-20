SmartClient.ServiceUser = DS.Model.extend({
  personal_fields: DS.attr(),
  clinical_fields: DS.attr(),
  pregnancies: DS.hasMany('pregnancy'),
  babies: DS.hasMany('baby'),
  appointments: DS.hasMany('appointment'),

  gestation: function () {
    pregnancies_content = this.get('pregnancies.content')
    var edd = moment(pregnancies_content[0].get('estimated_delivery_date'))
    var baby_ddt = this.get('babies.content')[0].get('delivery_date_time')

    if (baby_ddt == undefined || baby_ddt == "") {
      if (moment().isBefore(moment(edd), 'd')) {
        var diff = Math.ceil(edd.diff(moment(), 'd', true))
        diff = (280 - diff) // 280 is 40 weeks

        if (diff % 7 === 0) {
          return Math.floor(diff / 7) + " weeks"
        } else if (diff < 7) {
          return (diff % 7) + " days"
        } else {
          return Math.floor(diff / 7) + " weeks " + (diff % 7) + " days"
        }
      } else {
        return "T + " + Math.floor(moment().diff(edd, 'd', true))
      }
    } else {
      if (moment(baby_ddt).isBefore(moment(edd), 'd')) {
        var diff = Math.ceil(edd.diff(moment(baby_ddt), 'd', true))
        diff = (280 - diff) // 280 is 40 weeks

        if (diff % 7 === 0) {
          return Math.floor(diff / 7) + " weeks"
        } else if (diff < 7) {
          return (diff % 7) + " days"
        } else {
          return Math.floor(diff / 7) + " weeks " + (diff % 7) + " days"
        }
      } else {
        return "T + " + Math.floor(moment(baby_ddt).diff(edd, 'd', true))
      }
    }
  }.property('current_edd'),

  current_edd: function () {
    pregnancies_content = this.get('pregnancies.content')
    return pregnancies_content[0].get('estimated_delivery_date')
  }.property()
});
