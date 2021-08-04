
// Router HTTP / HTTPS
let mobile = require('is-mobile');

module.exports = function(app, redT) {
	// Home
	app.get('/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/mobile/');
		} else {
			return res.redirect('/');
		}
	});
	app.get('/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/mobile/');
		} else {
			return res.render('index');
		}
	});
	app.get('/mobile/', function(req, res) {
		if (mobile({ua:req})){
			return res.render('index_mobile');
		} else {
			return res.redirect('/');
		}
	});

	// Admin
	app.get('/adminenvikay/', function(req, res) {
		return res.render('adminenvikay');
	});

	// register
	app.get("/register", function (req, res) {
		res.render("register");
		
	});

	app.post("/register", function (req, res) {
		return res.redirect('/');
	});


	// Fanpage
	app.get('/fanpage/', function(req, res) {
		return require('./routes/fanpage/redirect')(res);
	});
	
	app.get("/help/ios", function (req, res) {
		res.render("/");
		
	});

	// // Help IOS
	// app.get('/help/ios/', function(req, res) {
	// 	return res.render('help/ios');
	// });

	// Sign API
	require('./routes/api')(app, redT);  // load routes API
};
