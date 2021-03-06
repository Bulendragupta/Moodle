@mod @mod_lesson
Feature: Lesson reset
  In order to reuse past lessons
  As a teacher
  I need to remove all previous data.

  Background:
    Given the following "users" exist:
      | username | firstname | lastname | email |
      | teacher1 | Tina | Teacher1 | teacher1@example.com |
      | student1 | Sam1 | Student1 | student1@example.com |
      | student2 | Sam2 | Student2 | student2@example.com |
    And the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1 | 0 |
    And the following "course enrolments" exist:
      | user | course | role |
      | teacher1 | C1 | editingteacher |
      | student1 | C1 | student |
      | student2 | C1 | student |
    And the following "groups" exist:
      | name    | course | idnumber |
      | Group 1 | C1     | G1       |
      | Group 2 | C1     | G2       |
    And the following "activities" exist:
      | activity | name             | intro                   | course | idnumber |
      | lesson   | Test lesson name | Test lesson description | C1     | lesson1  |
    And I am on the "Test lesson name" "lesson activity" page logged in as teacher1
    And I follow "Add a question page"
    And I set the field "Select a question type" to "True/false"
    And I press "Add a question page"
    And I set the following fields to these values:
      | Page title           | True/false question 1 |
      | Page contents        | Cat is an amphibian |
      | id_answer_editor_0   | False |
      | id_response_editor_0 | Correct |
      | id_jumpto_0          | Next page |
      | id_answer_editor_1   | True |
      | id_response_editor_1 | Wrong |
      | id_jumpto_1          | This page |
    And I press "Save page"

  Scenario: Use course reset to clear all attempt data
    When I log out
    And I am on the "Test lesson name" "lesson activity" page logged in as student1
    And I should see "Cat is an amphibian"
    And I set the following fields to these values:
      | False | 1 |
    And I press "Submit"
    And I press "Continue"
    And I should see "Congratulations - end of lesson reached"
    And I log out
    And I am on the "Test lesson name" "lesson activity" page logged in as teacher1
<<<<<<< HEAD
    And I navigate to "Reports" in current page administration
=======
    And I navigate to "Reports > Overview" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I should see "Sam1 Student1"
    And I am on the "Course 1" "reset" page
    And I set the following fields to these values:
        | Delete all lesson attempts | 1  |
    And I press "Reset course"
    And I press "Continue"
    And I am on the "Test lesson name" "lesson activity" page
<<<<<<< HEAD
    And I navigate to "Reports" in current page administration
=======
    And I navigate to "Reports > Overview" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    Then I should see "No attempts have been made on this lesson"

  @javascript
  Scenario: Use course reset to remove user overrides.
    When I am on the "Test lesson name" "lesson activity" page
<<<<<<< HEAD
    And I navigate to "Overrides" in current page administration
    And I follow "Add user override"
=======
    And I navigate to "User overrides" in current page administration
    And I press "Add user override"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I set the following fields to these values:
        | Override user    | Student1  |
        | Re-takes allowed | 1 |
    And I press "Save"
    And I should see "Sam1 Student1"
    And I am on the "Course 1" "reset" page
    And I set the following fields to these values:
        | Delete all user overrides | 1  |
    And I press "Reset course"
    And I press "Continue"
    And I am on the "Test lesson name" "lesson activity" page
<<<<<<< HEAD
    And I navigate to "Overrides" in current page administration
    Then I should not see "Sam1 Student1"

  Scenario: Use course reset to remove group overrides.
    When I navigate to "Overrides" in current page administration
    And I select "Group overrides" from the "jump" singleselect
    And I follow "Add group override"
=======
    And I navigate to "User overrides" in current page administration
    Then I should not see "Sam1 Student1"

  Scenario: Use course reset to remove group overrides.
    When I am on the "Test lesson name" "lesson activity" page
    And I navigate to "Group overrides" in current page administration
    And I press "Add group override"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I set the following fields to these values:
        | Override group   | Group 1  |
        | Re-takes allowed | 1 |
    And I press "Save"
    And I should see "Group 1"
    And I am on the "Course 1" "reset" page
    And I set the following fields to these values:
        | Delete all group overrides | 1  |
    And I press "Reset course"
    And I press "Continue"
    And I am on the "Test lesson name" "lesson activity" page
<<<<<<< HEAD
    And I navigate to "Overrides" in current page administration
    And I select "Group overrides" from the "jump" singleselect
=======
    And I navigate to "Group overrides" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    Then I should not see "Group 1"
