Feature: App Displays Learn React
  Everybody wants to know if my React Component App can display the words: Learn React

  Scenario: Shallow Render
    Given the DOM
    When I shallow render a React component called: App
    Then my app should contain the words: Learn React