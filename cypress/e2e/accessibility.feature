
  Feature: Accessibility

    Scenario Outline: Site is accessible
      Given I am a user checking the site's accessibility
      When I visit the "<page>" page
      Then the site should be accessible
      Examples:
        | page |
        | Home |