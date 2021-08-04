
let BauCua_cuoc = require('../../Models/BauCua/BauCua_cuoc');
let XocXoc_cuoc  = require("../../Models/XocXoc/XocXoc_cuoc");


/**
 * Ngẫu nhiên cược
 * return {number}
*/
let random = function(){
	let a = (Math.random()*35)>>0;
	if (a == 34) {
		// 34
		return (Math.floor(Math.random()*(50-45+1))+45)*50000;
	}else if (a >= 32 && a < 34) {
		// 32 33
		return (Math.floor(Math.random()*(45-10+1))+10)*50000;
	}else if (a >= 30 && a < 32) {
		// 30 31 32
		return (Math.floor(Math.random()*(100-20+1))+20)*5000;
	}else if (a >= 26 && a < 30) {
		// 26 27 28 29
		return (Math.floor(Math.random()*(50-10+1))+10)*5000;
	}else if (a >= 21 && a < 26) {
		// 21 22 23 24 25
		return (Math.floor(Math.random()*(20-1+1))+1)*5000;
	}else if (a >= 15 && a < 21) {
		// 15 16 17 18 19 20
		return (Math.floor(Math.random()*(20-1+1))+1)*5000;
	}else if (a >= 8 && a < 15) {
		// 8 9 10 11 12 13 14
		return (Math.floor(Math.random()*(10-1+1))+1)*5000;
	}else{
		// 0 1 2 3 4 5 6 7
		return (Math.floor(Math.random()*(10-1+1))+1)*5000;
	}
};

/**
 * Cược
*/

// Bầu cua RED
module.exports = function(bot, io,botCounttong){
	let cuoc = random();
	let betcuoc = (Math.random()*5)>>0;
	if (betcuoc == 0  ) {
		cuoc ==1000;
	}else if (betcuoc == 1 ){
		cuoc ==2000;
	}else if (betcuoc == 2) {
		cuoc ==5000;
	}else if (betcuoc == 3) {
		cuoc ==10000;
	}else if (betcuoc == 4) {
		cuoc ==100000;
	}else if (betcuoc == 5) {
		cuoc ==1000000;
	}
	
	let userCuoc = (Math.random()*12)>>0;
	let box="";
	if (userCuoc == 0 || userCuoc == 6 || userCuoc == 7 || userCuoc == 8 ) {
		io.game.xocxoc.data.red.chan += cuoc;
		box="chan";
	}else if (userCuoc == 1 || userCuoc == 9 || userCuoc == 10 || userCuoc == 11) {
		io.game.xocxoc.data.red.le += cuoc;
		box="le";
	}else if (userCuoc == 2) {
		io.game.xocxoc.data.red.red3 += cuoc;
		box="red3";
	}else if (userCuoc == 3) {
		io.game.xocxoc.data.red.red4 += cuoc;
		box="red4";
	}else if (userCuoc == 4) {
		io.game.xocxoc.data.red.white3 += cuoc;
		box="white3";
	}else if (userCuoc == 5) {
		io.game.xocxoc.data.red.white4 += cuoc;
		box="white4";
	}
	if ( userCuoc == 6 || userCuoc == 7 || userCuoc == 8 ) {
		userCuoc == 0;
	} 
	if (  userCuoc == 9 || userCuoc == 10 || userCuoc == 11) {
		userCuoc == 1;
	}

	let create = {uid:bot.id,name:bot.name, phien:io.game.xocxoc.phien, red : 1 , time: new Date()};
	create[box] = cuoc;
	XocXoc_cuoc.create(create);
	// let create = {uid: bot.id, name: bot.name, phien: io.xocxoc.phien, red:true, time: new Date()};
	// create[userCuoc] = cuoc;
	// BauCua_cuoc.create(create);


	Object.values(io.game.xocxoc.clients).forEach(function(users){
			for(let i=0;i<10;i++){
				users.red({xocxoc:{chip:{box:box, cuoc:cuoc}}});
			}	
			// if(userCuoc<=3){
			// 	botCounttong=botCounttong-(Math.random()*10)>>0;
			// }else{
			// 	botCounttong=botCounttong+(Math.random()*10)>>0;
			// }
			//users.red({xocxoc:{ingame:{client:botCounttong}}});
	});
	bot = null;
	io = null;
	create = null;
	cuoc = null;
	userCuoc = null;
}
