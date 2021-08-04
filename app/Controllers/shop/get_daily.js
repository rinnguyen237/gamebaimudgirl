
var tabDaiLy   = require('../../Models/DaiLy');
module.exports = function(client){
	//tabDaiLy.find({ rights: 10 }, function(err, daily) {
	tabDaiLy.find({}, function(err, daily){
		client.red({shop:{daily:daily}});
	});
}
