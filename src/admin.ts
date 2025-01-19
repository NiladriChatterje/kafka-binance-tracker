import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config()

async function init() {
    const kafka = new Kafka({
        clientId: 'crypto-tracker',
        brokers: [process.env.KAFKA_BROKER]
    });
    const admin = kafka.admin();
    await admin.createTopics({
        topics: [{
            topic: 'crypto-topic',
            numPartitions: 6,
            replicationFactor: 1
        }]
    });

    await admin.disconnect();
}

init().then(() => {
    console.log('topics created')
}).catch(err => {
    console.log(err)
})