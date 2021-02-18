import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import got from 'got'
import { Message, ProcessQueue } from './queue'

config()

const { PORT, MATRIX_SERVER } = process.env

export const server = express()
server.use(cookieParser())
server.use(cors())
server.use(bodyParser.json())

async function processorFn(msg: Message) {
  const json = {
    text: msg.text,
    color: msg.color,
  }
  return got.post(MATRIX_SERVER, { json })
}

const processQueue = new ProcessQueue(processorFn)

server.post('/', (req: express.Request, res: express.Response) => {
  const { text, color } = req.body as { text: string; color: string }
  if (!text) return res.status(400).end('Missing text')
  processQueue.insert({ text, color })
  return res.status(200).end('Text enqueued')
})

export const port = PORT
