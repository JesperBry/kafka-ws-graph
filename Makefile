create-topic:
	docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic ${name}

build:
	docker-compose build

run: build
	docker-compose up -d

down:
	docker-compose down