# delib-v3 - an environment for deliberation#

## Installtion

to install delib you must have an account in firebase.
The install firebase-tools:
npm i -g firebase-tools

then login to firebase using the CLI
firebase login

clone delib-v3
the install dependencies in the delib directory and in it's sub-directory functions, using npm i:
delib/ npm i
delib/functions npm i
then set delib to use your firebase database using firebase use <your fire-base-name>
add the config file in your project, according to your firebase-database

to run
`<addr>` npm run dev
and 
firebase serve
open browser on localhost:5000, and refresh to see changes




