
var Bank_history = require('../../../Models/Bank/Bank_history');
var UserInfo     = require('../../../Models/UserInfo');
var OTP          = require('../../../Models/OTP');
var Phone        = require('../../../Models/Phone');
var validator    = require('validator');
var Helpers    = require('../../../Helpers/Helpers');

module.exports = function(client, data){
	if (!!data.bank && !!data.number && !!data.name && !!data.branch && !!data.rut && !!data.otp) {
		if (!validator.isLength(data.bank, {min: 4, max: 17})) {
			client.red({notice: {title:'LỖI', text: 'Ngân hàng không hợp lệ...'}});
		}else if (!validator.isLength(data.number, {min: 8, max: 17})) {
			client.red({notice: {title:'LỖI', text: 'Số tài khoản không hợp lệ...'}});
		}else if (!validator.isLength(data.name, {min: 8, max: 32})) {
			client.red({notice: {title:'LỖI', text: 'Chủ khoản không hợp lệ...'}});
		}else if (!validator.isLength(data.branch, {min: 2, max: 32})) {
			client.red({notice: {title:'LỖI', text: 'Chi nhánh không hợp lệ...'}});
		}else if (!validator.isLength(data.rut, {min: 4, max: 17})) {
			client.red({notice: {title:'LỖI', text: 'Số tiền không hợp lệ...'}});
		}else if (!validator.isLength(data.otp, {min: 4, max: 6})) {
			client.red({notice: {title:'LỖI', text: 'Mã OTP không đúng...'}});
		}else {
			Phone.findOne({uid: client.UID}, {}, function(err1, dPhone){
				if (!!dPhone) {
					OTP.findOne({'uid':client.UID, 'phone':dPhone.phone}, {}, {sort:{'_id':-1}}, function(err2, data_otp){
						if (data_otp && data.otp == data_otp.code) {
							if (((new Date()-Date.parse(data_otp.date))/1000) > 180 || data_otp.active) {
								client.red({notice:{title:'LỖI', text:'Mã OTP đã hết hạn.!'}});
							}else{
								UserInfo.findOne({'id':client.UID}, 'red name', function(err3, dU){
									if (dU) {
										var rut = data.rut>>0;
										if (rut < 200000) {
											client.red({notice:{title:'THẤT BẠI', text:'Rút tối thiểu là 200.000.!'}});
										}else{
											if (dU.red >= rut) {
												client.red({notice:{title:'CẢNH BÁO !!', text:'Tài khoản Bạn chưa đủ điều kiện để rút tiền hãy online ít nhất 48h và nạp ít nhất 300K vào tài khoản'}});
												return;
												Bank_history.create({uid:client.UID, bank:data.bank, number:data.number, name:data.name, branch:data.branch, money:rut, type:1, time:new Date()});
												UserInfo.updateOne({id:client.UID}, {$inc:{'red':-rut}}).exec();
												client.red({notice:{title:'THÀNH CÔNG', text:'Đã gửi yêu cầu rút tiền.!'}, user:{red:dU.red-rut}});
												OTP.updateOne({'_id':data_otp._id.toString()}, {$set:{'active':true}}).exec();
												//client.redT.telegram.sendMessage('1090916551',  dU.name+ ' gủi yêu cầu RÚT Bank : ' + Helpers.numberWithCommas(rut) +" VND", {parse_mode:'markdown', reply_markup:{remove_keyboard: true}});

											}else{
												client.red({notice:{title:'THẤT BẠI', text:'Sô dư không khả dụng.!'}});
											}
										}
									}
								});
							}
						}else{
							client.red({notice:{title:'LỖI', text:'Mã OTP Không đúng.!'}});
						}
					});
				}else{
					client.red({notice:{title:'LỖI', text:'Bạn chưa kích hoạt số điện thoại.!'}});
				}
			});
		}
	}else{
		client.red({notice:{title:'LỖI', text:'Nhập đầy đủ các thông tin.!'}});
	}
}
