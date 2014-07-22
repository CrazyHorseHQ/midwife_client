MidwifeClient.Router.map(function () {

  this.resource('midwives', function(){
    this.resource('midwife', { path: '/:midwife_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });

});
