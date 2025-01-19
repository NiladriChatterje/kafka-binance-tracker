import { Spot, WebsocketStream } from '@binance/connector-typescript';
import { Kafka, logLevel, Producer } from 'kafkajs';
import dotenv from 'dotenv'
dotenv.config();


const API_KEY = 'dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83'
const SECRET = '2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9';
const spot: Spot = new Spot(API_KEY, SECRET, {
    baseURL: 'https://api.binance.com'
});
const kafka: Kafka = new Kafka({
    clientId: 'crypto-tracker',
    brokers: [process.env.KAFKA_BROKER],
    logLevel: logLevel.INFO
});

export const SYMBOLS = ['BNBUSDT', 'STORJETH', 'STORJBTC', 'ENJETH', 'MODETH', 'MODBTC']
const callbacks = {
    open: () => spot.logger.info('open'),
    close: () => spot.logger.debug('closed'),
    message: async (data: string): Promise<void> => {
        const producer: Producer = kafka.producer();
        const jsonData = JSON.parse(data);
        console.log(jsonData);

        await producer.send({
            topic: 'crypto-topic',
            messages: [{ value: data, key: jsonData.data['s'] }]
        })

        await producer.disconnect();
    }
}

//  This exchangeInformation() was run to pick some symbol lists
//   spot.exchangeInformation().then((value)=>{
//     console.log(value)
// })

const websocketStreamClient = new WebsocketStream({ callbacks, combinedStreams: true });
for (let symbol of SYMBOLS)
    websocketStreamClient.aggTrade(symbol);
