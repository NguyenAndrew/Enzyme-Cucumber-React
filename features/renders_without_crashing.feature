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