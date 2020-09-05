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

### firebase configuration
- next.js firebase auth example reference
https://github.com/vercel/next.js/tree/master/examples/with-firebase-authentication

```
$ vi .env.local
```

```.env.local
FIREBASE_CLIENT_EMAIL= XXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY = XXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = XXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_DATABASE_URL = XXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_PROJECT_ID = XXXXXXXXXXXXXXXXXXX

FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
…
---END PRIVATE KEY-----\n
```

## commands
### restart next server
`$ docker exec -it jucy_next_1 npm run dev`
