# Delib-v3
Clone delib to your local repository. 

## Setting up firebase project
Firebase console: new project - name it with delib prefix

Firebase console: enable sign in with google 

Firebase console: authontication email 

Start database: firebase database->create dabase firestore->start in test mode->enable


## Setting up node.js
install node.js from https://nodejs.org/en/ (to check your node.js version in command line ```node -v```). 


## Install node models

In cli goto to your local delib dir, and write: ```npm i```

In cli goto to /functions, and write: ```npm i``` 

define new project in firebase. 



## Config
Inside firebase console setting -> chose config -> copy.

Create new config file - configKey.js in src/functions/firebase and paste there the config from firebase console. 

for example: 
```
// src/functions/firebase/configKey.js

const firebaseConfig = {
  apiKey: "Your API Key",
  authDomain: "you firebase admin.firebaseapp.com",
  databaseURL: "https://you firebase admin.firebaseio.com",
  projectId: <your name>,
  storageBucket: "you firebase admin.appspot.com",
  messagingSenderId: "messagingSenderId",
  appId: "app Id"
};

module.exports = configKey;

```

## Run
Open two comand line terminal (cmd)

in cmd-1: ```npm run dev ```

in cmd-2: ```firebase serve```

To view changes, press f5 in the brawser