import { Consumer, EachMessagePayload, Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
    clientId: 'crypto-tracker',
    brokers: [process.env.KAFKA_BROKER]
});

const consumer: Consumer = kafka.consumer({
    groupId: 'crypto-consumer-group',
    maxBytesPerPartition: 1000
});

async function handleMessage({ topic, partition, message, heartbeat, pause }: EachMessagePayload): Promise<void> {

}

const init = async (): Promise<void> => {

    await consumer.run({
        eachMessage: handleMessage
    })
}