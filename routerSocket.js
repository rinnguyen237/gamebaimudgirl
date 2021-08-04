
let users = require('./socketUsers');
let admin = require('./socketAdmin');
// Router Websocket

module.exports = function(app, redT) {
	app.ws('/websocket', function(ws, req) {
		users(ws, redT);
	});
	app.ws('/adminenvikay', function(ws, req) {
		admin(ws, redT)
	});
};
