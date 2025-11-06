import { getChannel } from './RabbitConfig'

export default class Producer {
  sendMessage = async (queue: string, message: string): Promise<void> => {
    const channel = getChannel()
    await channel.assertQueue(queue, { durable: true })
     channel.sendToQueue(queue, Buffer.from(message))
    console.log(`Message sent to ${queue}: ${message}`)
  }

  sendNotification = async (queue: string, payload: any): Promise<void> => {
    const message = JSON.stringify(payload)
    await this.sendMessage(queue, message)
  }
}
