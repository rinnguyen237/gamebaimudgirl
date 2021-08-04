
var UserInfo    = require('../app/Models/UserInfo');
var TaiXiu_User  = require('../app/Models/TaiXiu_user');
var MiniPoker_User  = require('../app/Models/miniPoker/miniPoker_users');
var Bigbabol_User  = require('../app/Models/BigBabol/BigBabol_users');
var VQRed_User  = require('../app/Models/VuongQuocRed/VuongQuocRed_users');
var BauCua_User  = require('../app/Models/BauCua/BauCua_user');
var Mini3Cay_User  = require('../app/Models/Mini3Cay/Mini3Cay_user');
var CaoThap_User  = require('../app/Models/CaoThap/CaoThap_user');
var Candy_user  = require('../app/Models/Candy/Candy_user');
var AngryBirds_user  = require('../app/Models/AngryBirds/AngryBirds_user');
var LongLan_user  = require('../app/Models/LongLan/LongLan_user');
var XocXoc_user  = require('../app/Models/XocXoc/XocXoc_user');
var MegaJP_user  = require('../app/Models/MegaJP/MegaJP_user');
let User      = require('../app/Models/Users');
let helpers   = require('../app/Helpers/Helpers');
	
	// code tạo boot day nè

module.exports = function() {
	console.log("bat dau tao bot");
	for (var i = 0; i < 70; i++) {
		console.log("bat dau tao bot si "+i);
		let username = 'concmeoaa';
		let password= "khoahen1";
		username = username + i ;
		console.log("ten dagn nhap là+"+username+" mk la: "+password)
		User.create({'local.username':username, 'local.password':helpers.generateHash(password), 'local.regDate': new Date()}, function(err, user){
			if (!!user){
				username=username + 'a';
				let UID=user._id.toString();
				UserInfo.create({'id':UID, 'name':username, 'joinedOn':new Date(), 'type': true ,'red': 10000000}, function(errC, user){
											if (!!errC) {
												//client.red({notice:{load: 0, title: 'LỖI', text: 'Tên nhân vật đã tồn tại.'}});
												console.log("Tên nhân vật đã tồn tại.");
											}else{
												user = user._doc;
												user.level   = 1;
												user.vipNext = 100;
												user.vipHT   = 0;
												user.phone   = '';

												delete user._id;
												delete user.redWin;
												delete user.redLost;
												delete user.redPlay;
												delete user.xuWin;
												delete user.xuLost;
												delete user.xuPlay;
												delete user.thuong;
												delete user.vip;
												delete user.hu;
												delete user.huXu;

												//addToListOnline(client);

												// let data = {
												// 	Authorized: true,
												// 	user: user,
												// 	message:{news:1},
												// };
												//client.profile = {name: user.name};
												
												TaiXiu_User.create({'uid': UID});
												MiniPoker_User.create({'uid': UID});
												Bigbabol_User.create({'uid': UID});
												VQRed_User.create({'uid': UID});
												BauCua_User.create({'uid': UID});
												Mini3Cay_User.create({'uid': UID});
												CaoThap_User.create({'uid': UID});
												AngryBirds_user.create({'uid': UID});
												Candy_user.create({'uid': UID});
												LongLan_user.create({'uid': UID});
												XocXoc_user.create({'uid': UID});
												MegaJP_user.create({'uid': UID});
												//GameState(client);
												//client.red(data);
											}
										});
			}else{
				console.log("tai khoan da ton tai stt"+i);
			}
		});

	}	
	 
}