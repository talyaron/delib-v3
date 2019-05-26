# delib-v3

# Setting up

Clone delib to your local dir. 

in Firebase create new project - name it with delib prefix.

If you dont have node installed on your machine, install node.js from https://nodejs.org/en/ (to check your node.js version in command line node -v). 

In cli goto to your local delib dir, and write:
``` npm i```

In cli goto to delib/function, and write:
```npm i```

define new project in firebase. 
Inside firebase setting -> chose config -> copy. 
create new config file - configKey.js in src/functions/firebase and paste there the config from firebase. 

for example: 

const firebaseConfig = {
  apiKey: "AIzaSyCCCXDDc-SpRtGPh3NzHziHfClRtytp7cM",
  authDomain: "delib-sim.firebaseapp.com",
  databaseURL: "https://delib-sim.firebaseio.com",
  projectId: <your name>,
  storageBucket: "delib-sim.appspot.com",
  messagingSenderId: "65953423432",
  appId: "1:65953423432:web:f40562a8798af2e5"
};

in cmd2: npm run dev 
in cmd1: firebase login 

firebase enable sign in with google 
firebase define authontication email 
firebase database->create dabase firestore->start in test mode->enable
