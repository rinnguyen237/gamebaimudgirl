
let CronJob = require('cron').CronJob;

module.exports = function (obj) {
	new CronJob('*/45 * * * * *', function () {
		let count = 0;
		let nameUser='';
		Promise.all(Object.values(obj.users).map(function (users) {
			let user = users[0].profile.name;
			count++;
			nameUser= nameUser + user + " - ";
		}));
		//obj.telegramUseronline.sendMessage('1090916551', "Số người đang online là  : " + count  + " ==> "+ nameUser, {parse_mode:'markdown', reply_markup:{remove_keyboard: true}});
	}, null, true, 'Asia/Ho_Chi_Minh');
}
