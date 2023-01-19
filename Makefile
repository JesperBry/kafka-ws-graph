create-topic:
	docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic ${name}

build:
	docker-compose build

run: build
	docker-compose up -d

down:
	docker-compose down

kafka-dev:
	docker-compose -f docker-compose.dev.yml build broker;
	docker-compose -f docker-compose.dev.yml up broker;