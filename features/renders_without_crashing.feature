Feature: Renders without Crashing
  Everybody wants to know if my React App can render without crashing

  Scenario: Render App
    Given a Document Object Model (DOM)
    When I render a React component called: App
    Then my app should have rendered without crashing

# import React from 'react';
# import ReactDOM from 'react-dom';
# import App from './App';

# it('renders without crashing', () => {
#   const div = document.createElement('div');
#   ReactDOM.render(<App />, div);
#   ReactDOM.unmountComponentAtNode(div);
# });