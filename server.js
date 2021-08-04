
// server.js
global.idNumbertele = 1090916551;
require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
let Telegram      = require('node-telegram-bot-api');
//let TelegramToken = '987211295:AAGlIN124PtI_g3VXSWXczTrc_ri9BBx-ek';
let TelegramToken = '1899272485:AAEbd1HIxWCKJFgwWaRrQf8FdFfd7ckC1hY';
let TelegramCheckUseronlineToken = '1729360867:AAEhDmSiNPO0YFcWghAW-mfGRY0Go';

let TelegramBot   = new Telegram(TelegramToken, {polling: true});
let TelegramBotUseronline   = new Telegram(TelegramCheckUseronlineToken, {polling: true});

let express    = require('express');
let app        = express();
let port       = process.env.PORT || 8080;
let expressWs  = require('express-ws')(app);
let bodyParser = require('body-parser');

// Setting & Connect to the Database
let configDB = require('./config/database');
let mongoose = require('mongoose');

require('mongoose-long')(mongoose); // INT 64bit

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex',   true);
mongoose.connect(configDB.url, configDB.options); // kết nối tới database

// cấu hình tài khoản admin mặc định và các dữ liệu mặc định
require('./config/admin');

// đọc dữ liệu from
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs'); // chỉ định view engine là ejs
app.set('views', './views');   // chỉ định thư mục view

// Serve static html, js, css, and image files from the 'public' directory
app.use(express.static('public'));

// server socket
let redT = expressWs.getWss();
redT.telegram = TelegramBot;
redT.telegramUseronline = TelegramBotUseronline;

require('./app/Helpers/socketUser')(redT); // Add function socket

require('./routerHttp')(app, redT);   // load các routes HTTP
require('./routerSocket')(app, redT); // load các routes WebSocket

require('./app/Cron/taixiu')(redT);   // Chạy game Tài Xỉu
require('./app/Cron/baucua')(redT);   // Chạy game Bầu Cua

require('./config/cron')();
require('./config/cronxs')();
require('./config/cronchattx')(redT);  // bot chat
require('./config/croncheckuseronline')(redT);  // bot check user online
//require('./config/crontextchatdata')();
//require('./config/cronnamebotgame')();

require('./update')();

require('./app/Telegram/Telegram')(TelegramBot); // Telegram Bot

app.listen(port);
// tao bot ao choi game
//require('./config/croncreateboot')();
