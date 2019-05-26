
# delib-v3

# Setting up

## Install delib

Clone delib to your local dir. 

in Firebase create new project - name it with delib prefix.

If you dont have node installed on your machine, install node.js from https://nodejs.org/en/ (to check your node.js version in command line node -v). 

In cli goto to your local delib dir, and write:
``` npm i```

In cli goto to delib/function, and write:
```npm i```


## Define new project in firebase

Inside firebase setting -> chose config -> copy. 

create new config file - configKey.js in src/functions/firebase and paste there the config from firebase. 

for example: 

const firebaseConfig = {
  apiKey: "<your api key",
  authDomain: "<your auth amdmin>",
  databaseURL: "<your databse url>",
  projectId: <your name>,
  storageBucket: "delib-*.appspot.com",
  messagingSenderId: "<messanger sende Id>",
  appId: "<app Id>"
};
  
In firebase enable sign in with google 
In firebase define authontication email 
  
## Create Database in Firebase 
firebase database->create dabase firestore->start in test mode->enable

## Run 
in cmd2: ```npm run dev ```

in cmd1: ```firebase login```


