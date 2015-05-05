'use strict';

var http = require('http');

var server = http.createServer(function(request, response) {
  if (request.url === '/hello') {
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
      response.write(JSON.stringify({msg: 'hello world'}));
      response.end();
    } else {
      response.writeHead(404, {
        'Content-Type': 'application/json'
      });

      response.write(JSON.stringify({msg: 'could not find the page'}));
      response.end();
    }
  }

  if (request.url === '/time') {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
  }





});

server.listen(3000, function() {
  console.log('server started');
});
