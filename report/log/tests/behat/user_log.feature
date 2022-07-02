@report @report_log
Feature: User can view activity log.
  In order to view user log
  As an teacher
  I need to view user today's and all report

  Background:
    Given the following "courses" exist:
      | fullname | shortname | category | groupmode |
      | Course 1 | C1 | 0 | 1 |
    And the following "users" exist:
      | username | firstname | lastname    | email                | idnumber | middlename | alternatename | firstnamephonetic | lastnamephonetic |
      | teacher1 | Teacher   | One         | teacher1@example.com | t1       |            | fred          |                   |                  |
      | student1 | Grainne   | Beauchamp   | student1@example.com | s1       | Ann        | Jill          | Gronya            | Beecham          |
    And the following "course enrolments" exist:
      | user | course | role |
      | teacher1 | C1 | editingteacher |
      | student1 | C1 | student |
<<<<<<< HEAD
    And the following "activity" exists:
      | activity                            | assign                  |
      | course                              | C1                      |
      | idnumber                            | 0001                    |
      | name                                | Test assignment name    |
      | intro                               | Submit your online text |
      | section                             | 1                       |
      | assignsubmission_onlinetext_enabled | 1                       |
      | assignsubmission_file_enabled       | 0                       |
    And the following config values are set as admin:
      | fullnamedisplay | firstname |
      | alternativefullnameformat | middlename, alternatename, firstname, lastname |
=======
    And the following config values are set as admin:
      | fullnamedisplay | firstname |
      | alternativefullnameformat | middlename, alternatename, firstname, lastname |
    And I log in as "teacher1"
    And I am on "Course 1" course homepage with editing mode on
    And I add a "Assignment" to section "1" and I fill the form with:
      | Assignment name | Test assignment name |
      | Description | Submit your online text |
      | assignsubmission_onlinetext_enabled | 1 |
      | assignsubmission_file_enabled | 0 |
    And I log out
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I log in as "student1"
    And I am on "Course 1" course homepage
    And I follow "Test assignment name"
    When I press "Add submission"
    And I set the following fields to these values:
      | Online text | I'm the student first submission |
    And I press "Save changes"
    And I log out

  Scenario: View Todays' and all log report for user
    Given I log in as "teacher1"
    And I am on "Course 1" course homepage
    And I navigate to course participants
    And I follow "Ann, Jill, Grainne, Beauchamp"
    When I follow "Today's logs"
    And I should see "Assignment: Test assignment name"
    And I follow "Ann, Jill, Grainne, Beauchamp"
    And I follow "All logs"
    Then I should see "Assignment: Test assignment name"

  Scenario: No log reader enabled should be visible when no log store enabled.
    Given I log in as "admin"
    And I navigate to "Plugins > Logging > Manage log stores" in site administration
    And I click on "Disable" "link" in the "Standard log" "table_row"
    And I log out
    And I log in as "teacher1"
    And I am on "Course 1" course homepage
    And I navigate to course participants
    And I follow "Ann, Jill, Grainne, Beauchamp"
    When I follow "Today's logs"
    And I should see "No log reader enabled"
<<<<<<< HEAD
    And I am on "Course 1" course homepage
    And I navigate to course participants
=======
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I follow "Ann, Jill, Grainne, Beauchamp"
    And I follow "All logs"
    Then I should see "No log reader enabled"

  Scenario: View Todays' log report for user through Course log report
    Given I log in as "teacher1"
    And I am on "Course 1" course homepage
<<<<<<< HEAD
    And I navigate to "Reports" in current page administration
    And I click on "Logs" "link"
=======
    And I navigate to "Reports > Logs" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I set the field with xpath "//select[@name='user']" to "Ann, Jill, Grainne, Beauchamp"
    When I click on "Get these logs" "button"
    Then I should see "Ann, Jill, Grainne, Beauchamp"
