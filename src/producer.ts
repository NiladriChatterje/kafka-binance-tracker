import {Spot, WebsocketStream} from '@binance/connector-typescript';
import {Kafka,logLevel} from 'kafkajs';


const API_KEY = 'dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83'
const SECRET = '2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9';
const spot:Spot = new Spot(API_KEY,SECRET,{
    baseURL:'https://api.binance.com'
});
const kafka = new Kafka({
    clientId:'crypto-tracker',
    brokers:['localhost:9092'],
    logLevel:logLevel.INFO
});
const producer = kafka.producer();
const callbacks = {
    open: () => spot.logger.info('open'),
    close: () => spot.logger.debug('closed'),
    message: async (data:string) => {
        const jsonData = JSON.parse(data);
        console.log(jsonData)
        // await producer.send({
        //     topic:jsonData['s'],
        //     messages:[{value:data}]
        // })
    }
  }

  spot.exchangeInformation().then(value=>{
    console.log(value)
  })

//   const websocketStreamClient = new WebsocketStream({ callbacks,combinedStreams:true });
//   websocketStreamClient.aggTrade('bnbusdt');
   