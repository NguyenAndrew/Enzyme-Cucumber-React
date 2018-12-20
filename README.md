# Cucumber Enzyme React App

This project will show you how to setup Cucumber and Enzyme on a Create React App. While you are free to download and use this boilerplate repository, I suggest you follow the instructions below to understand how the setup works.

## Tutorial/Instructions

1. Create your React app with Create React App: https://github.com/facebook/create-react-app
1. Install Cucumber as a dev dependency, and create a test script for cucumber. In this project, the script is called cucumber-test: https://docs.cucumber.io/guides/10-minute-tutorial/
1. Follow Cucumber tutorials to create passing Cucumber Tests (Note: We are testing to see if Cucumber works here. React and Enzyme integration upcoming!): https://docs.cucumber.io/guides/10-minute-tutorial/
1. Create a renders_without_crashing.feature file in features/
1. Delete is_it_friday_yet.feature and any other Cucumber Tutorial stepdefs. Insert missing stepdefs from renders_without_crashing.feature into your stepdefs file
1. Copy code from src/App.test.js into features/step_definitions/stepdefs.js (Note: Your tests will have several errors, which we will fix!)
1. Install @babel/core and @babel/cli as dev dependencies: https://babeljs.io/docs/en/babel-cli
1. Move features/step_definitions into step_definitions on the root of your project
1. Add babel-test script, which looks like the following: `"babel-test": "npx babel step_definitions --out-dir features/transpiled_step_definitions"` Make sure to add features/transpiled_feature_step_definitions into your .gitignore
1. Install @babel/preset-react as a dev dependency, so you can transpile react code: https://babeljs.io/docs/en/babel-preset-react
1. Use the @babel/preset-react in your babel-test script, which looks like the following: `"babel-test": "npx babel step_definitions --out-dir features/transpiled_step_definitions --presets=@babel/react"`
1. Install @babel/preset-env as a dev dependency, so you can transpile your latest JavaScript syntax for node (Note: Used when you execute npm run): https://babeljs.io/docs/en/babel-preset-env
1. Change your babel-test script to also use @babel/preset-env, which looks like the following: `"npx babel step_definitions --out-dir features/transpiled_step_definitions --presets=@babel/react,@babel/preset-env"`
1. Cucumber runs the step definitions from features/transpiled_step_definitions, so you need to change breaking imports in step_definitions/stepdefs.js. The import should be `import App from '../../src/App';`
1. Remove src/App.test.js and change test script to the following: `"test": "npm run babel-test && npm run cucumber-test"`. You can now run your tests with npm run test
1. At this point, Babel should be able to transpile your Cucumber step definitions folder, but your tests will not pass yet because your App isn't transpiled either!
1. Transpile your source folder, by adding the following script: `"babel-src": "npx babel src --out-dir transpiled --presets=@babel/react,@babel/preset-env --copy-files"` IMPORTANT: Notice that you need to add --copy-files to bring over the non-transpiled files for React. Also make sure to add transpiled to your .gitignore
1. Fix breaking imports to use transpiled instead of src: `import App from '../../transpiled/App';`
1. Change the test script to include transpiling of the src folder: `"test": "npm run babel-src && npm run babel-test && npm run cucumber-test"`
1. Your tests will now run! However, they will fail because the DOM does not exist in the backend. We will fix this shortly.
1. Install jsdom as a dev dependency https://www.npmjs.com/package/jsdom
1. In your step_definitions, you will need to use JSDOM to configure the dom. https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
Note: An example is found in the FAQ / Troubleshooting section below under "Q: ReferenceError: document is not defined"
1. At this point, your test pasts! Let's now integrate Enzyme, so we can shallow render components.
1. Install enzyme and enzyme-adapter-react-16 as dev dependencies
1. Update your feature file, and use enzyme tests in your step defs. Example code below:

features/renders_without_crashing.feature
```
Feature: Renders without Crashing
  Everybody wants to know if my React App can render without crashing

  Scenario: Render App
    Given the DOM
    When I render a React component called: App
    Then my app should have rendered without crashing

  Scenario: Shallow Render App
    Given the DOM
    When I shallow render a React component called: App
    Then my app should have rendered without crashing
      And my app should contain the words: Learn React
```

step_definitions/stepdefs.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../transpiled/App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render} from 'enzyme';

const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

// Configures Enzyme Adapter
configure({ adapter: new Adapter() });

Given('the DOM', function () {
    global.window = window;
    global.document = window.document;
});

When('I render a React component called: App', function () {
    this.div = document.createElement('div');
    ReactDOM.render(<App />, this.div);
    ReactDOM.unmountComponentAtNode(this.div);
});

When('I shallow render a React component called: App', function () {
    this.wrapper = shallow(<App />);
});

Then('my app should have rendered without crashing', function () {});

Then('my app should contain the words: Learn React', function () {
    assert(this.wrapper.contains('Learn React'));
});
```

**Congratulations!** You have made Create React App with both Cucumber and Enzyme functionality!

## FAQ / Troubleshooting

Q: I have the following error: (function (exports, require, module, __filename, __dirname) { import React from 'react';

A: You need to transpile your step_definitions and/or src directory with Babel, and you need to use the preset @babel/preset-env https://babeljs.io/docs/en/babel-preset-env

---

Q: I have an Unexpected token error: ReactDOM.render(<App />, div);

A: You need to transpile with the Babel preset @babel/preset-react https://babeljs.io/docs/en/babel-preset-react

---

Q: Error: Cannot find module './App'

A: You need to change your app import in your step_definitions, as if you were running the step definitions from features/transpiled_step_definitions. The correct import mid-tutorial will be ../../src/App in this project. If you have started to transpile your application, this import will be ../../transpiled/App

---

Q: I have a Syntax error: (function (exports, require, module, __filename, __dirname) { \<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">

Q2: Importing CSS in Cucumber React - I have a Syntax error: (function (exports, require, module, __filename, __dirname) { .App {

SyntaxError: Unexpected token .

A: Your Cucumber step_definitions are running on server instead of a browser client. Therefore, your React code needs to check if it has access to the DOM. https://stackoverflow.com/questions/32216383/in-react-how-do-i-detect-if-my-component-is-rendering-from-the-client-or-the-se Check the answer below to see the code that solves this problem.

---

Q: 'import' and 'export' may only appear at the top level (9:2)

A: Use require instead of import. 

For Example: 
```
import logo from './logo.svg'; 
import './App.css';
```
Should be converted to
```
let canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let logo = '';

if (canUseDOM) {
  logo = require('./logo.svg');
  require('./App.css');
}
```

---

Q: ReferenceError: document is not defined

A: Your Cucumber step_definitions are running on a server instead of a browser client. https://stackoverflow.com/questions/32126003/node-js-document-is-not-defined. You solve this by using something like JSDOM and creating a global document variable.

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../transpiled/App';

const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

Given('the DOM', function () {
    global.window = window;
    global.document = window.document;
});

When('I render a React component called: App', function () {
    this.div = document.createElement('div');
    ReactDOM.render(<App />, this.div);
});

Then('my app should have rendered without crashing', function () {
    ReactDOM.unmountComponentAtNode(this.div);
});
```

---

Q: ReferenceError: ReferenceError: div is not defined

A: Use this.div when setting and using the variable in Cucumber

---

Q: I got my tests to work? Why should I use Enzyme?

A: Enzyme allows you to shallow render React components, allowing you to isolate components when testing.

---

Q: This setup is so long. Can I shorten it somehow?

A: Yes you can use WebdriverIO to render a built react app into your tests. This removes the need to configure the transpiling and setup needed to run React components on node. http://webdriver.io/

---

Q: If WebdriverIO exists, why use this setup?

A:

* From the front page of webdriver.io, "WebdriverIO lets you control a browser or a mobile application with just a few lines of code." WebdriverIO is used for end-to-end testing https://www.npmjs.com/package/webdriverio https://marmelab.com/blog/2016/04/19/e2e-testing-with-node-and-es6.html 

* This guide shows how to configure Cucumber to execute tests on a unit level, which adds additional benefits to both businesses and developers (Explained in more detail below).

---

Q: How does Unit testing with Cucumber benefit businesses?

A: 

* "Sometimes it is valuable to implement BDD with Cucumber for unit tests, but only when the business can benefit. Imagine a specific algorithm that decides to sell a stock for instance.
A unit test that is implemented using JUnit or similar should still strive for verifying the behaviour. They should not be aware of the actual implementation. If they are too tightly coupled to the implementation, they will become a hindrance when refactoring. That is not something you want. These unit tests will not be validated by a stakeholder as they are written in code, and most stakeholders don't read code." https://cucumber.io/blog/2016/07/20/where_should_you_use_bdd

* "Cucumber is not slow. Starting a browser is slow. Starting and stopping your application is slow. This is mitigated the more you test at the bottom of the agile testing pyramid. Find a balance where BDD and Cucumber support you rather than hinder you." https://cucumber.io/blog/2016/07/20/where_should_you_use_bdd

* Summary: Behavior Driver Development (BDD) is not a replacement to Unit Tests, Integration Tests, and End-to-End Tests. **BDD is a methodology of testing, and Cucumber helps developers effectively use that methodology.** There is especially a lot of value in how Cucumber allows developers to write unit tests in feature files written in Gherkin: Allowing developers to focus on the features they are implementing, quicker development and test times, creating cleaner code, communication and clarification with product owners, and demonstrating project value to stakeholders.