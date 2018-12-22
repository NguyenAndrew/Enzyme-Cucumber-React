# Cucumber Enzyme React App

This project will show you how to setup Cucumber and Enzyme on a Create React App. While you are free to download and use this boilerplate repository, I suggest you follow the instructions below to understand how the setup works.

## Tutorial/Instructions

### Part I - Getting Cucumber Ready

1. Create your React app with Create React App: https://github.com/facebook/create-react-app
1. Install Cucumber as a dev dependency https://docs.cucumber.io/guides/10-minute-tutorial/
1. Follow Cucumber tutorials to create passing Cucumber Tests (Note: We are testing to see if Cucumber works here. React and Enzyme integration upcoming!): https://docs.cucumber.io/guides/10-minute-tutorial/
1. Create a renders_without_crashing.feature file in features/
1. Delete is_it_friday_yet.feature and remove all lines from stepdefs.js. Insert missing stepdefs from renders_without_crashing.feature into your stepdefs file
1. Copy code from src/App.test.js into features/step_definitions/stepdefs.js (Note: Your tests will have several errors, which we will fix!)
1. Delete src/App.test.js

### Part 2 - Getting your Cucumber Unit Tests to Work

8. You will need to transpile your code for Cucumber to work with React JSX and the latest ECMAScript/JavaScript syntax
1. Install @babel/core and @babel/cli as dev dependencies: https://babeljs.io/docs/en/babel-cli
1. Install @babel/node as a dev dependency https://babeljs.io/docs/en/babel-node
1. Change your test script in package.json to the following: `"test": "npx babel-node node_modules/cucumber/bin/cucumber-js"`
1. Install @babel/preset-react as a dev dependency, so you can transpile react code: https://babeljs.io/docs/en/babel-preset-react
1. Change your test script in package.json to the following: `"test": "npx babel-node --presets=@babel/react node_modules/cucumber/bin/cucumber-js"`
1. Install @babel/preset-env as a dev dependency, so you can transpile your latest JavaScript syntax for node (Note: Used when you execute npm run): https://babeljs.io/docs/en/babel-preset-env
1. Change your test script in package.json to the following: `"test": "npx babel-node --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js"`
1. Cucumber runs the step definitions from features/step_definitions, so you need to change breaking imports in your stepdefs.js. The import should be `import App from '../../src/App';`
1. Your files will now be transpiled on the fly! However, your test will fail because the DOM does not exist in node (Remember, React is usually run on a browser, and not directly on node). We will fix this, by providing our own DOM.
1. Install jsdom as a dev dependency https://www.npmjs.com/package/jsdom
1. In your step_definitions, you will need to use JSDOM. Code on how to use JSDOM is provided in the link and in Part 3. https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

### Part 3 - Using Enzyme in your Unit Tests
19. At this point, your test pasts! Let's now integrate Enzyme, so we can shallow render components.
1. Install enzyme and enzyme-adapter-react-16 as dev dependencies. https://airbnb.io/enzyme/docs/installation/react-16.html
1. Update your feature file, and use enzyme tests in your step defs. Your Cucumber tests should look like the following:

features/renders_without_crashing.feature
```
Feature: App Displays Learn React
  Everybody wants to know if my React Component App can display the words: Learn React

  Scenario: Shallow Render
    Given the DOM
    When I shallow render a React component called: App
    Then my app should contain the words: Learn React
```

features/step_definitions/stepdefs.js
```
import React from 'react';
import App from '../../src/App';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

// Configures Enzyme Adapter
configure({ adapter: new Adapter() });

Given('the DOM', function () {
    const { JSDOM } = require('jsdom');
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;
    global.window = window;
    global.document = window.document;
});

When('I shallow render a React component called: App', function () {
    this.wrapper = shallow(<App />);
});

Then('my app should contain the words: Learn React', function () {
    assert(this.wrapper.contains('Learn React'));
});
```

**Congratulations!** You have made Create React App with both Cucumber and Enzyme functionality!

## FAQ / Troubleshooting

Q: I have the following error: (function (exports, require, module, __filename, __dirname) { import React from 'react';

A: You need to transpile your step_definitions and/or src directory with Babel, and you need to use the preset `@babel/preset-env` https://babeljs.io/docs/en/babel-preset-env

---

Q: I have an Unexpected token error: ReactDOM.render(<App />, div);

A: You need to transpile with Babel, and you need to use the preset `@babel/preset-react` https://babeljs.io/docs/en/babel-preset-react

---

Q: Error: Cannot find module './App'

A: You need to change your app import location in your step_definitions. The correct location for this tutorial is `../../src/App`

---

Q: 'import' and 'export' may only appear at the top level (9:2)

A: Use require instead of import. For Example: 
```
  logo = require('./logo.svg'); // import logo from './logo.svg'; 
  require('./App.css'); // import './App.css';
```

---

Q: I am having problems importing files in Cucumber
* Importing SVG in Cucumber.js - Syntax error: (function (exports, require, module, __filename, __dirname) { \<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"> 
* Importing CSS in Cucumber.js - Syntax error: (function (exports, require, module, __filename, __dirname) { .App { SyntaxError: Unexpected token .

A: Your Cucumber step_definitions are running on server instead of a browser client. Therefore, your React code needs to check if it has access to the DOM. For Example:

```
  logo = require('./logo.svg'); // import logo from './logo.svg'; 
  require('./App.css'); // import './App.css';
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

More information can be found at: https://stackoverflow.com/questions/32216383/in-react-how-do-i-detect-if-my-component-is-rendering-from-the-client-or-the-se

---

Q: ReferenceError: document is not defined

A: Your Cucumber step_definitions are running on a server instead of a browser client. https://stackoverflow.com/questions/32126003/node-js-document-is-not-defined. You solve this by using something like JSDOM and creating a global document variable.:

```
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;
```

---

Q: ReferenceError: ReferenceError: div is not defined

A: Instead of doing `div = ...` Use `this.div = ...` when setting and using variables in Cucumber.

---

Q: I got my tests to work? Why should I use Enzyme?

A: Enzyme allows you to shallow render React components, allowing you to isolate components when testing.

---

Q: How do I use Enzyme?

A: https://devhints.io/enzyme - This cheat sheet should help you get started with Enzyme.

---

Q: This setup is so long. Can I shorten it somehow?

A: Yes you can use WebdriverIO to render a built react app into your tests. This removes the need to configure the transpiling and setup needed to run React components on node. http://webdriver.io/

---

Q: If WebdriverIO exists, why use this setup?

A: You should have more unit tests than end-to-end tests.

* From the front page of webdriver.io, "WebdriverIO lets you control a browser or a mobile application with just a few lines of code." WebdriverIO is used for end-to-end testing https://www.npmjs.com/package/webdriverio https://marmelab.com/blog/2016/04/19/e2e-testing-with-node-and-es6.html 

* This guide shows how to configure Cucumber to execute tests on a unit level, which adds additional benefits to both businesses and developers (Explained in more detail below).

---

Q: How does Unit testing with Cucumber benefit businesses and developers?

A: Provides benefits from multiple perspectives.

* "Sometimes it is valuable to implement BDD with Cucumber for unit tests, but only when the business can benefit. Imagine a specific algorithm that decides to sell a stock for instance.
A unit test that is implemented using JUnit or similar should still strive for verifying the behaviour. They should not be aware of the actual implementation. If they are too tightly coupled to the implementation, they will become a hindrance when refactoring. That is not something you want. These unit tests will not be validated by a stakeholder as they are written in code, and most stakeholders don't read code." https://cucumber.io/blog/2016/07/20/where_should_you_use_bdd

* "Cucumber is not slow. Starting a browser is slow. Starting and stopping your application is slow. This is mitigated the more you test at the bottom of the agile testing pyramid. Find a balance where BDD and Cucumber support you rather than hinder you." https://cucumber.io/blog/2016/07/20/where_should_you_use_bdd

* Summary: Behavior Driver Development (BDD) is not a replacement to Unit Tests, Integration Tests, and End-to-End Tests. **BDD is a methodology of testing, and Cucumber helps developers effectively use that methodology.** There is especially a lot of value in how Cucumber allows developers to write unit tests in feature files written in Gherkin: Allowing developers to focus on the features they are implementing, quicker development and test times, creating cleaner code, communication and clarification with product owners, and demonstrating project value to stakeholders.