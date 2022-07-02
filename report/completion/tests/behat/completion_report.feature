@report @report_completion
Feature: See the completion for items in a course
  In order see completion data
  As a teacher
  I need to view completion report

  Background:
<<<<<<< HEAD
    Given the following "custom profile fields" exist:
      | datatype | shortname | name  |
      | text     | fruit     | Fruit |
    And the following "users" exist:
      | username | firstname | lastname  | email                | middlename | alternatename | firstnamephonetic | lastnamephonetic | profile_field_fruit |
      | teacher1 | Teacher   | 1         | teacher1@example.com |            | fred          |                   |                  |                     |
      | student1 | Grainne   | Beauchamp | student1@example.com | Ann        | Jill          | Gronya            | Beecham          | Kumquat             |
=======
    Given the following "users" exist:
      | username | firstname | lastname    | email                | idnumber | middlename | alternatename | firstnamephonetic | lastnamephonetic |
      | teacher1 | Teacher   | 1           | teacher1@example.com | t1       |            | fred          |                   |                  |
      | student1 | Grainne   | Beauchamp   | student1@example.com | s1       | Ann        | Jill          | Gronya            | Beecham          |
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And the following "courses" exist:
      | fullname | shortname | category | enablecompletion |
      | Course 1 | C1        | 0        | 1                |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | teacher1 | C1     | editingteacher |
      | student1 | C1     | student        |
    And the following "activities" exist:
      | activity | name       | intro      | course | idnumber | completion | completionview |
      | page     | PageName1  | PageDesc1  | C1     | PAGE1    | 1          | 1              |
<<<<<<< HEAD

  @javascript
  Scenario: The completion report respects user fullname setting
    Given the following config values are set as admin:
      | fullnamedisplay | firstname |
      | alternativefullnameformat | middlename, alternatename, firstname, lastname |
    And I am on the "C1" "Course" page logged in as "teacher1"
    And I navigate to "Course completion" in current page administration
    And I expand all fieldsets
    And I set the following fields to these values:
      | Page - PageName1 | 1 |
    And I press "Save changes"
    And I am on "Course 1" course homepage
    When I navigate to "Reports" in current page administration
    And I click on "Course completion" "link" in the "region-main" "region"
    Then I should see "Ann, Jill, Grainne, Beauchamp"

  @javascript
  Scenario: The completion report displays custom user profile fields
    Given the following config values are set as admin:
      | showuseridentity | email,profile_field_fruit |
    And I am on the "C1" "Course" page logged in as "teacher1"
=======
    And the following config values are set as admin:
      | fullnamedisplay | firstname |
      | alternativefullnameformat | middlename, alternatename, firstname, lastname |

  @javascript
  Scenario: Go to the completion report
    Given I log in as "teacher1"
    And I am on "Course 1" course homepage
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I navigate to "Course completion" in current page administration
    And I expand all fieldsets
    And I set the following fields to these values:
      | Page - PageName1 | 1 |
    And I press "Save changes"
    And I am on "Course 1" course homepage
<<<<<<< HEAD
    When I navigate to "Reports" in current page administration
    And I click on "Course completion" "link" in the "region-main" "region"
    # We can't refer to table headings by name because they aren't on the first row.
    Then the following should exist in the "completionreport" table:
      | -1-               | -2-                  | -3-     |
      | Grainne Beauchamp | student1@example.com | Kumquat |
=======
    When I navigate to "Reports > Course completion" in current page administration
    Then I should see "Ann, Jill, Grainne, Beauchamp"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
