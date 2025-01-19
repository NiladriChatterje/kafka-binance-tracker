import { Kafka } from 'kafkajs';
import { SYMBOLS } from './producer';

async function init() {
    const kafka = new Kafka({
        clientId: 'crypto-tracker',
        brokers: [process.env.KAFKA_BROKER]
    });
    const admin = kafka.admin();
    admin.createTopics({
        topics: [{
            topic: 'crypto-topic',
            numPartitions: SYMBOLS.length,
            replicationFactor: 3
        }]
    });

    await admin.disconnect();
}

init()