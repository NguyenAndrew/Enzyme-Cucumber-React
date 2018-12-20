import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../transpiled/App';

const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('the DOM', function () {
    const div = document.createElement('div');
});

When('I render a React component called: App', function () {
    ReactDOM.render(<App />, div);
});

Then('my app should have rendered without crashing', function () {
    ReactDOM.unmountComponentAtNode(div);
});