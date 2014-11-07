function FakeServer () {
  this.server = sinon.fakeServer.create();
}

//Helpers to setup and teardown the fake server
FakeServer.prototype.teardown = function() {
  this.server.restore();
}
