# Delib-v3

Download delib to your local dir. 

firebase new project - name it with delib prefix 

install node.js from https://nodejs.org/en/ (to check your node.js version in command line ```node -v```). 

In cli goto to your local delib dir, and write: ```npm i```

In cli goto to function, and write: ```npm i``` 

define new project in firebase. 

Inside firebase setting -> chose config -> copy. 

create new config file - configKey.js in src/functions/firebase and paste there the config from firebase. 

for example: 
```
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

in cmd2: npm run dev 
in cmd1: firebase login 

firebase enable sign in with google 
firebase define authontication email 
firebase database->create dabase firestore->start in test mode->enable