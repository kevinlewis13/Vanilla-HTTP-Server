'use strict';

//Thanks to Andrew for the help with parsing the URL for greet/name!

var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {
  var reqPaths = url.parse(request.url).path.split('/');
  var pathEnd = reqPaths[reqPaths.length -1];

  if (request.url === '/time') {
    var date = new Date();
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.write(JSON.stringify({msg: 'It is ' + date.toLocaleTimeString() + ' server time.'}));
    response.end();
  }

  if (reqPaths.length === 3 && reqPaths[1] === 'greet') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.write(JSON.stringify({msg: 'Hi, ' + pathEnd + '!'}));
    response.end();
  }

  if (reqPaths.length > 3 && reqPaths[1] === 'greet') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.write(JSON.stringify({msg: 'Try to put in only one name!'}));
    response.end();
  }

  if (request.url === '/greet') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });

    if (request.method.toLowerCase() === 'post') {
      console.log('post');
      request.on('data', function(data) {
        var body = JSON.parse(data.toString('utf-8'));
        response.write(JSON.stringify({msg: 'hello ' + body.name}));
        response.end();
      });

    } else {
      response.write(JSON.stringify({msg: 'hi everybody!'}));
      response.end();
    }

  } else {
      response.writeHead(404, {
        'Content-Type': 'application/json'
      });

      response.write(JSON.stringify({msg: 'could not find the page'}));
      response.end();
    }

});

server.listen(3000, function() {
  console.log('server started');
});
