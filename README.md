# Boilerplate for a project with React, Firebase and TypeScript

## Features
* Tech:

  * React (create-react-app)
  * Firebase
  * React Router
  * React Context API
  * ESlint
  * Prettier
  * TypeScript

* Features:

  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Protected Routes with Authorization
  * Firestore: Store Users
  
## Installation
* `git clone https://github.com/nitinsaroha/react-firebase-auth-typescript.git`
* `cd react-firebase-auth-typescript`
* `yarn install`
* Visit https://firebase.google.com/ and create a Firebase App.

  * Activate Email/Password Sign-In Method in your Firebase App. Leave email link sign-in disabled
  * Add firebase Credentials in .env file created from below command. `src/firebase/firebase.tsx` will automatically take the credentials from .env

  * `cp .env-sample.txt .env`
* yarn start
* Visit localhost:3000