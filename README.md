# FECA - Frontend Container Application
This project was bootstrapped with [Create React App]

## Introduction
The NetEnt new Frontend Container Application (FECA) is responsible to open different applications of NetEnt with same ui in a container.

### Features provided by FECA:
- Login to authenticate user
- Displaying dashboard
- Options to open different url in same place
- Logout from application

### Prerequisites
- node (v 8.11.2)
- npm (v 5.6.0)
- chrome browser

### Installing
- Clone frontend repo (https://github.com/nitish-arora/feca)
- Navigate to cloned repo folder `cd feca`

### How to run
Running `npm start` will start a development server on http://localhost:3000/.

### How to test
- Running `npm test` will run tslint check test with karma and jasmine.

-------------------
## Frontend Built with

### Technologies
- For __scripting__, the frontend uses [React.Js]
- For __styling__, the frontend uses [css] and components from [Material Design] through [ Material UI](https://material-ui.com/).
For __testing__, the frontend uses the [Jest] (https://github.com/facebook/jest). and [Enzyme] (https://github.com/airbnb/enzyme)

-------------------

## Current Folder Details
- assets: consists of icons and images related to application
- constants: consist of configurable messages to use for pages folder
- pages: consist of main application pages
- shared: consist of reusable components ( can also make library for these folders)
- utils: consist of files for reusing the functionality