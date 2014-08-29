SmartClient.ServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    // return this.get('store').find('service_options');
    return [
      {
        id: 1,
        name: "Domino (Dublin)",
        clinic_ids: [2, 3, 4, 5]
      }
    ]
  }
});
