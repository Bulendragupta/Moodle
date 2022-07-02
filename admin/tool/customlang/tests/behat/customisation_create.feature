@tool @tool_customlang
Feature: Within a moodle instance, an administrator should be able to modify langstrings for the entire Moodle installation.
  In order to change langstrings in the adminsettings of the instance,
  As an admin
  I need to be able to access and change values in the the language customisation of the language pack.

  Background:
    # This is a very slow running test and on slow databases can take minutes to complete.
    Given I mark this test as slow setting a timeout factor of 4

    And I log in as "admin"
    And I navigate to "Language > Language customisation" in site administration
    And I set the field "lng" to "en"
    And I press "Open language pack for editing"
    And I press "Continue"
    And I set the field "Show strings of these components" to "moodle.php"
<<<<<<< HEAD
    And I set the field "String identifier" to "moodledocslink"
    And I press "Show strings"
    And I set the field "core/moodledocslink" to "moodle documents"
=======
    And I set the field "String identifier" to "administrationsite"
    And I press "Show strings"
    And I set the field "core/administrationsite" to "Custom string example"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

  @javascript
  Scenario: Edit an string but don't save it to lang pack.
    When I press "Apply changes and continue editing"
<<<<<<< HEAD
    Then I should not see "moodle documents" in the "page-footer" "region"
    And I should see "Help and documentation" in the "page-footer" "region"
=======
    Then I should see "Site administration" in the "page-header" "region"
    And I should not see "Custom string example" in the "page-header" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

  @javascript
  Scenario: Customize an string as admin and save it to lang pack.
    Given I press "Save changes to the language pack"
    And I should see "There are 1 modified strings."
    When I click on "Continue" "button"
<<<<<<< HEAD
    Then I should not see "Help and documentation" in the "page-footer" "region"
    And I should see "moodle documents" in the "page-footer" "region"
=======
    Then I should see "Custom string example" in the "page-header" "region"
    And I should not see "Site administration" in the "page-header" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
