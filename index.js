process.title = 'WebServerSOAP';
port = process.env.PORT || 7070,
webServer = require('./server');

webServer.listen(port, function() {
console.log('Server started at port ' + port);
});