process.title = 'WebServerSOAP';
var args = process.env.PORT,
port = args[2] || 7070,
webServer = require('./server');

webServer.listen(port, function() {
console.log('Server started at port ' + port);
});