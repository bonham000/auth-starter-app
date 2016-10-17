## React Node Light SPA

This light starter kit is designed to get you up and running with a bunch of awesome technologies.

## Features

* React, Redux, Node.js & SASS
* You can use ES6+ (with object spread and decorators) on client and server, it's compiles to ES5 with babel.
* Client hot reloading (page reloads on client file change)
* Server hot reloading (server reloads on server file change)
* Redux devtools - [GIF](https://camo.githubusercontent.com/a0d66cf145fe35cbe5fb341494b04f277d5d85dd/687474703a2f2f692e696d6775722e636f6d2f4a34476557304d2e676966). Just install browser extension: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/).
* And many others

## Usage

### Notes

* Server code in ```/src/server``` folder, client code in ```/src/client``` folder
* Server and client bundles stores in ```/dist``` folder
* ```bundle.js``` size is just ~90kb (in Chrome)

### Instalation

```
git clone https://github.com/yondepo/react-node-light-spa.git
cd react-node-light-spa
npm install
```

### Development

Run app with development environment including Hot reloading.

```
npm run dev
```

### Production

Build app and run with production environment.

```
npm run build
npm start
```

## Licence

MIT
