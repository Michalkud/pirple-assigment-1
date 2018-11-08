const http = require('http');
const url = require('url');
const config = require('./config');

const httpServer = http.createServer(function(req, res) {

  const parsedUrl = url.parse(req.url, true);
  
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const choosenHandler = 
    typeof router[trimmedPath] !== 'undefined' ?
    router[trimmedPath] :
    router.notFound;

  choosenHandler({}, function(statusCode, payload) {

    statusCode = typeof statusCode === 'number' ? statusCode : 200;

    payload = typeof payload === 'object' ? payload : {};

    const payloadString = JSON.stringify(payload);

    res.setHeader('Content-Type', 'application/json');

    res.writeHead(statusCode);

    res.end(payloadString);

  });
});

httpServer.listen(config.httpPort, function() {
  console.log(`Server now running and listening on port ${config.httpPort}.`);
});

const handlers = {
  notFound: function(data, callback) {
    callback(404);
  },
  helloWorld: function(data, callback) {
    callback(200, {
      'message': 'Hi! This is json response from my first Pirple course assigment ;-)'
    });
  }
};

const router = {
  'notFound': handlers.notFound,
  'hello': handlers.helloWorld 
};



