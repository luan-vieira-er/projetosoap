var http = require('http'),
  config = require('./config'),
  fileHandler = require('./filehandler'),
  parse = require('url').parse,
  types = config.types,
  rootFolder = config.rootFolder,
  defaultIndex = config.defaultIndex,
  server;

 module.exports = server = http.createServer();

 server.on('request', onRequest);

 function onRequest(req, res) {
    console.log("Inicializado Server SOAP - Pi Estimado: " + getPi()) ;
    //res.send("Pi Estimado: " + getPi());

  var filename = parse(req.url).pathname,
      fullPath,
      extension;

  if(filename === '/') {
      filename = defaultIndex;
  }
  fullPath = rootFolder + filename;
  extension = filename.substr(filename.lastIndexOf('.') + 1);

  fileHandler(fullPath, function(data) {
      res.writeHead(200, {
           'Content-Type': types[extension] || 'text/plain',
           'Content-Length': data.length
      });
      res.end(data);

  }, function(err) {
      res.writeHead(404);
      res.end();
  });
 }

 function getPi(){
    var n = 10000000, inside = 0, x, y, z;
    for (i = 0; i<n; i++){
        x = Math.random();
        y = Math.random();
        if (Math.sqrt(x * x + y * y) <= 1){
            inside++;
        }
    }
    return 4 * inside / n;
}