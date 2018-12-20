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