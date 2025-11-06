import { getChannel } from './RabbitConfig'

export default class Consumer {
  consumeMessage = async (queue: string) => {
    try {
      const channel = getChannel()

      await channel.assertQueue(queue, { durable: true })

      console.log(' Waiting for Messages...')

      channel.consume(queue, msg => {
        if (!msg) return

        const data = JSON.parse(msg.content.toString())
        console.log(' Received:', data)
        channel.ack(msg)
        return msg
      })
    } catch (error) {
      console.error(' Consumer Error:', error)
    }
  }
}
