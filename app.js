window.App = (function() {
  var that = {};
  var me;
  var peers = [];
  var username;
  var posts = [];

  var getUsername = function() {
    username = localStorage.username;
    console.log(username);

    if (!username) {
      username = prompt('Pick a username:');
      localStorage.username = username;
    };
  };

  var registerPeer = function(id) {
    var peer = me.connect(id);

    var eventHandlers = {
      'hello': function (username) {
        console.log("Hello from" + username);
      }
    };

    me.on('connection', function(connection) {
      connection.on('open', function() {
        connection.on('data', function(data) { 
          console.log(data);
          eventHandlers[data.message](data.payload);
        });
      });

      connection.send({
        message: 'hello',
        payload: username,
      });
    });
  };

  var getPeers = function() {
    if (username != 'nick') {
      registerPeer('nick');
    }
  };

  that.start = function () {
    getUsername();
    me = new Peer(username, {key: '3w0quehucsjrlik9', debug: 3});
    getPeers();
  };

  return that;
}());

$(App.start);
