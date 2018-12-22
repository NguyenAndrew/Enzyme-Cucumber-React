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