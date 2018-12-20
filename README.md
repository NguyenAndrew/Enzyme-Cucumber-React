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
1. Install @babel/preset-react as dev dependencies, so you can transpile react code: https://babeljs.io/docs/en/babel-preset-react
1. Use the @babel/preset-react in your babel-test script, which looks like the following: `"babel-test": "npx babel step_definitions --out-dir features/transpiled_step_definitions --presets=@babel/react"`
1. Install @babel/preset-env as dev dependencies, so you can transpile your latest JavaScript syntax for node (Note: Used when you execute npm run): https://babeljs.io/docs/en/babel-preset-env
1. Change your babel-test script to also use @babel/preset-env, which looks like the following: `"npx babel step_definitions --out-dir features/transpiled_step_definitions --presets=@babel/react,@babel/preset-env"`
1. Cucumber runs the step definitions from features/transpiled_step_definitions, so you need to change a breaking imports in step_definitions/stepdefs.js located to `import App from '../../src/App';`
1. Remove src/App.test.js and change test script to the following: `"test": "npm run babel-test && npm run cucumber-test"`. You can now run your tests with npm run test
1. At this point, Babel should be able to transpile your Cucumber step definitions folder, but your tests will not pass yet because your App isn't transpiled either!


### FAQ / Troubleshooting

Q: I have the following error: (function (exports, require, module, __filename, __dirname) { import React from 'react';
A: You need to transpile your step_definitions and/or src directory with Babel, and you need to use the preset @babel/preset-env https://babeljs.io/docs/en/babel-preset-env

Q: I have an Unexpected token error: ReactDOM.render(<App />, div);
A: You need to transpile with the Babel preset @babel/preset-react https://babeljs.io/docs/en/babel-preset-react

Q: Error: Cannot find module './App'
A: You need to change your app import in your step_definitions, as if you were running the step definitions from features/transpiled_step_definitions. The correct import mid-tutorial will be ../../src/App in this project. If you have completed the tutorial, this import will be ../../transpiled/App