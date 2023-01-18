# Getting Started with Create React App

This project was bootstrapped with Create React App and the [clean-ts template](https://github.com/JesperBry/cra-template-ts-clean).

## Available Scripts

### NPM scripts

```
$ npm start
$ npm run build
$ npm test
$ npm run eject
```

### Make commands (starting docker)

NODE_V (setting spesific version for node, used by nvmrc and docker image) is a optional argument (default: 18.12.1) for both `make build-dev` and `make build-prod`. e.g. `make build-dev NODE_V=14.17.5`

Starting dev (localhost:3000)

```
$ make build-dev
$ make run-dev
```

Starting prod (starting nginx at localhost:8080)

```
$ make build-prod
$ make run-prod
```
