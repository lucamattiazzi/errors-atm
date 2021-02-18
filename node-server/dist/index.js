"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const got_1 = __importDefault(require("got"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const queue_1 = require("./queue");
dotenv_1.config();
const { MATRIX_SERVER, BOT_TOKEN } = process.env;
function processorFn(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = {
            text: msg.text,
            color: msg.color,
        };
        return got_1.default.post(MATRIX_SERVER, { json });
    });
}
const processQueue = new queue_1.ProcessQueue(processorFn);
const bot = new node_telegram_bot_api_1.default(BOT_TOKEN, { polling: true });
const colors = {
    'Luca Mattiazzi': 'blue',
    default: 'green',
};
bot.on('message', (msg) => {
    const { id: chatId, first_name, last_name } = msg.chat;
    const { text } = msg;
    const name = `${first_name} ${last_name}`;
    const color = colors[name] || colors.default;
    processQueue.insert({ text, color });
    bot.sendMessage(chatId, 'Ok grazie, messo in coda!');
});
//# sourceMappingURL=index.js.map