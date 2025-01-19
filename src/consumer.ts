import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'crypto-tracker',
    brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({
    groupId: 'crypto-consumer-group',
    maxBytesPerPartition: 1000
})