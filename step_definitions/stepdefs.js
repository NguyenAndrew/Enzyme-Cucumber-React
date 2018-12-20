import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('a Document Object Model \(DOM)', function () {
    const div = document.createElement('div');
});

When('I render a React component called: App', function () {
    ReactDOM.render(<App />, div);
});

Then('my app should have rendered without crashing', function () {
    ReactDOM.unmountComponentAtNode(div);
});