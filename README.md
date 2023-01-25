# kafka-ws-graph

<img src="https://github.com/JesperBry/kafka-ws-graph/blob/main/resources/event-driven-architecture.png" alt="" border="0" />

## PROD

Will auto create the topic with name events, and run all services in seperate docker containers.

```
$ make run
```

## DEV

```
$ make kafka-dev
$ make create-topic name=events

$ cd server/ npm install
$ npm start

$ cd data-producer/ npm install
$ npm start

$ cd client/ npm install
$ npm start

```

### DOTENV-files

Client:

```
REACT_APP_SOCKET_URL = "http://localhost:5000"
REACT_APP_OFFCET_POINTS = "60"
```

Server (consumer):

```
PORT = 5000
CORS_ORIGIN = '*'
KAFKA_BROKER = 'broker:9092'
KAFKA_TOPICS = <EVENT NAME>
KAFKA_ADMIN_OFFCET_POINTS = 60
```

Producer:

```
KAFKA_BROKER = 'broker:9092'
KAFKA_TOPICS = <EVENT NAME>
```
