# Kafka crypto monitor

## docker image setup
-  for learning purpose, I ran only a single broker instance.
-  I used simple ```apache-kafka/3.9.0``` image.
-  I kept replication factor = 1 for topic ```crypto-topic```, since a single broker instance is running. [for multiple instance, zookeeper is required]
-  I spawned the container in detached mode.

## Node.js
-  I prepared an admin for topic creation.
-  number of partitions in the ```crypto-topic``` is statically set to 6 since I picked 6 cryptos from exchangeInformation() API function of ```@binance/connector```
-  I produced the info to Kafka topic.
-  The info is itself a ```stream``` obtained from ```WebSocketStream``` providing the data.
-  finally, I created a consumer belonging to consumer group ```crypto-consumer-group```.
-  then I ran 3 instances of the consumer in different sessions to consume streams of info.
And everything works as expected.
