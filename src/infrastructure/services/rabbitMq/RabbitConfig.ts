// src/config/rabbitmq.ts
import * as amqp from 'amqplib'

let channel: amqp.Channel
let connection: any

const RABBIT_URL = "amqps://pcngzhip:HrsXjKYXJX6oe2D34cTTBIIXxGQP54Lz@gorilla.lmq.cloudamqp.com/pcngzhip"

export const connectRabbitMQ = async (): Promise<amqp.Channel> => {
  try {
    connection = await amqp.connect(RABBIT_URL)
    channel = await connection.createChannel()
    console.log('RabbitMQ connected')
    return channel
  } catch (err) {
    console.error('Failed to connect RabbitMQ', err)
    process.exit(1)
  }
}
export const getChannel = () => channel
