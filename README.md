# jucy

## Getting Started
### install node_modules
```
$ cd juicy/app
$ npm install
```

### docker-compose up
```
// If you haven't installed docker yet.
$ brew install docker docker-compose
$ brew cask install docker
$ sudo usermod -aG docker $USER
$ sudo chmod +x /usr/local/bin/docker-compose
$ open /Applications/Docker.app
//

$ cd juicy
$ docker-compose up -d
```

## commands
### restart next server
`$ docker exec -it juicy_next_1 npm run dev`
