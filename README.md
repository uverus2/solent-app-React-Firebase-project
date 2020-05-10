# Solent Collaboration App
The purpose of the project is the creation of an simple collaboration application that can be used by students based on an university assigment. To run the application please follow the instructions below or simply visit [link](https://solent-app.web.app). 

If you would like to run the application locally you will require your own firebase credentials to do so.

## Requirements 
- Firebase Account [link](https://firebase.google.com)

## Install application
Please run `npm install` or `yarn` to install the required dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn deploy` or `npm run deploy`

This will deploy the application via the firebase hosting service

### `yarn set-rules` or `npm run set-rules`

This will push database rules to firebase where you can control rights for reading, updating, deleting and adding data to the database.

### `yarn set-functions` or `npm run set-functions`

This will push cloud functions to the database. They are used to run server side code. You can add functions to functions/index.js

