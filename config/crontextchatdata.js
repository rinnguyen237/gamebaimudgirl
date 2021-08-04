
let CronJob = require('cron').CronJob;
var TXChat      = require('./../app/Models/TaiXiu_chat');


module.exports = function () {
	var flag=true;
	new CronJob('*/45 * * * * *', function () {
		
		if (flag){
			var lineReader = require('readline').createInterface({
				input: require('fs').createReadStream('./data/textchat.txt')
				  });
				  lineReader.on('line', function (line) {
					TXChat.create({'uid':'1123456789', 'name':"iloveyou", 'value':line});
				  });

			  flag=false;	  
		}
		
		// fs.readFile('./data/textchat.txt', 'utf8', (errjs, taixiujs) => {
		// 	//var taixiujs = JSON.parse(taixiujs);
		// 	console.log(taixiujs);
		// });
	}, null, true, 'Asia/Ho_Chi_Minh');
}
