import { Consumer, EachMessagePayload, Kafka } from "kafkajs";
import dotenv from 'dotenv';
dotenv.config()

const kafka: Kafka = new Kafka({
    clientId: 'crypto-tracker',
    brokers: [process.env.KAFKA_BROKER]
});

const consumer: Consumer = kafka.consumer({
    groupId: 'crypto-consumer-group',
    maxBytesPerPartition: 1000
});

async function handleMessage({ topic, partition, message, heartbeat, pause }: EachMessagePayload): Promise<void> {
    console.log(`consumed from ${partition} : ${message.value.toString()}`)
}

const init = async (): Promise<void> => {

    await consumer.run({
        eachMessage: handleMessage
    })
}

init().then(() => {
    console.log('consumer running successfully')
});