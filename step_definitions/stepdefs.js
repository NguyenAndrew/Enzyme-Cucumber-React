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