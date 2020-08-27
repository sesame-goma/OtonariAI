# jucy

## Getting Started
### install node_modules
```
$ cd jucy/app
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

$ cd jucy
$ docker-compose up -d
```

## commands
### restart next server
`$ docker exec -it jucy_next_1 npm run dev`
