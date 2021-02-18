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
exports.port = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const got_1 = __importDefault(require("got"));
const queue_1 = require("./queue");
dotenv_1.config();
const { PORT, MATRIX_SERVER } = process.env;
exports.server = express_1.default();
exports.server.use(cookie_parser_1.default());
exports.server.use(cors_1.default());
exports.server.use(body_parser_1.default.json());
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
exports.server.post('/', (req, res) => {
    const { text, color } = req.body;
    if (!text)
        return res.status(400).end('Missing text');
    processQueue.insert({ text, color });
    return res.status(200).end('Text enqueued');
});
exports.port = PORT;
//# sourceMappingURL=app.js.map