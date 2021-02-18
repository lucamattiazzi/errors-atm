import { config } from 'dotenv'
import got from 'got'
import TelegramBot from 'node-telegram-bot-api'

import { Message, ProcessQueue } from './queue'

config()

const { MATRIX_SERVER, BOT_TOKEN } = process.env

async function processorFn(msg: Message) {
  const json = {
    text: msg.text,
    color: msg.color,
  }
  return got.post(MATRIX_SERVER, { json })
}

const processQueue = new ProcessQueue(processorFn)
const bot = new TelegramBot(BOT_TOKEN, { polling: true })

const colors = {
  'Luca Mattiazzi': 'blue',
  default: 'green',
}

bot.on('message', (msg) => {
  const { id: chatId, first_name, last_name } = msg.chat
  const { text } = msg
  const name = `${first_name} ${last_name}`
  const color = colors[name] || colors.default
  processQueue.insert({ text, color })
  bot.sendMessage(chatId, 'Ok grazie, messo in coda!')
})
