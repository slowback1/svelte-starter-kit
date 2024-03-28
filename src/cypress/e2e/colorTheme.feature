Feature: Color Themes
  Scenario: Default Color Theme
    Given I visit the app for the first time
    Then I should see the default color theme

  Scenario: Changing Color Themes
    Given I visit the app for the first time
    When I switch the color theme
    Then I should see the other color theme

  Scenario: Changing Color Themes Twice
    Given I visit the app for the first time
    When I switch the color theme twice
    Then I should see the default color theme