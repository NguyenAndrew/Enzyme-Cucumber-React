## Cucumber Enzyme React App

This project will show you how to setup Cucumber and Enzyme on a Create React App. While you are free to download and use this boilerplate repository, I suggest you follow the instructions below to understand how this project works.

### Instructions

1. Create your React app with Create React App: https://github.com/facebook/create-react-app
1. Install Cucumber as a dev dependency, and create a test script for cucumber. In this project, the script is called cucumber-test: https://docs.cucumber.io/guides/10-minute-tutorial/
1. Follow Cucumber tutorials to create passing Cucumber Tests (Note: We are testing to see if Cucumber works here. React and Enzyme integration upcoming!): https://docs.cucumber.io/guides/10-minute-tutorial/
1. Create a renders_without_crashing.feature file in features/
1. Delete is_it_friday_yet.feature and any other Cucumber Tutorial stepdefs. Insert missing stepdefs from renders_Without_crashing.feature
1. Copy code from src/App.test.js into features/step_definitions/stepdefs.js (Note: Your tests will have several errors, which we will fix!)
1. Install @babel/core and @babel/cli as dev dependencies: https://babeljs.io/docs/en/babel-cli
1. Move features/step_definitions into step_definitions on the root of your project
1. Add babel-test script, which looks like the following: `"babel-test": "npx babel step_definitions --out-dir features/transpiled_step_definitions"` Make sure to add features/transpiled_feature_step_definitions into your .gitignore

### FAQ / Troubleshooting

Q: I have the following error: (function (exports, require, module, __filename, __dirname) { import React from 'react';
A: You need to transpile your stepdefs.js with Babel

Q: I have an Unexpected token error: ReactDOM.render(<App />, div);
A: You need to transpile with the Babel preset @babel/preset-react