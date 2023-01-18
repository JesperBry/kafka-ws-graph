NODE_V = 18.12.1

.PHONY: build-dev
build-dev:
	[ -f .nvmrc ] || (touch .nvmrc; echo "v$(NODE_V)" > .nvmrc);
	docker build --build-arg NODE_VERSION=$(NODE_V) --target=dev --no-cache -t client-app .

.PHONY: build-prod
build-prod:
	docker build --build-arg NODE_VERSION=$(NODE_V) --target=production -t client-app .

.PHONY: run-dev
run-dev:
	docker run --rm --name client-app -p 3000:3000 -p 9229:9229 -p 35729:35729 -v "$(PWD)/src:/usr/src/app/client/src" client-app

.PHONY: run-prod
run-prod:
	docker run -d --rm --name client-app -p 8080:80 client-app