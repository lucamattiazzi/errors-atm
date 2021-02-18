export interface Message {
  text: string
  color: string
}

interface QueueMessage extends Message {
  next: QueueMessage
}

type ProcessorFn = (msg: Message) => void

export class ProcessQueue {
  processorFn: ProcessorFn
  next: QueueMessage = undefined
  first: QueueMessage = undefined
  last: QueueMessage = undefined

  constructor(processorFn: ProcessorFn) {
    this.processorFn = processorFn
  }

  insert = (message: Message) => {
    const queueMessage: QueueMessage = { ...message, next: undefined }
    if (this.last) {
      this.last.next = queueMessage
      this.last = queueMessage
    } else {
      this.first = queueMessage
      this.last = queueMessage
      this.start()
    }
  }

  printQueue = (msg: QueueMessage) => {
    if (msg.next) this.printQueue(msg.next)
  }

  start = async () => {
    while (this.first) {
      await this.processorFn(this.first)
      this.first = this.first.next
    }
    this.last = undefined
  }
}
