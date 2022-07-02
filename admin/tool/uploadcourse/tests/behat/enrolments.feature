@tool @tool_uploadcourse @_file_upload
Feature: An admin can update courses enrolments using a CSV file
  In order to update courses enrolments using a CSV file
  As an admin
  I need to be able to upload a CSV file with enrolment methods for the courses

  Background:
    Given the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | 0        |
    And I log in as "admin"

  @javascript
  Scenario: Creating enrolment method by enable it
<<<<<<< HEAD
    Given I am on the "Course 1" "enrolment methods" page
=======
    Given I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I click on "Delete" "link" in the "Guest access" "table_row"
    And I click on "Continue" "button"
    And I should not see "Guest access" in the "generaltable" "table"
    And I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_enable.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And "Disable" "icon" should exist in the "Guest access" "table_row"

  @javascript
  Scenario: Creating enrolment method by disabling it
<<<<<<< HEAD
    Given I am on the "Course 1" "enrolment methods" page
=======
    Given I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I click on "Delete" "link" in the "Guest access" "table_row"
    And I click on "Continue" "button"
    And I should not see "Guest access" in the "generaltable" "table"
    And I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_disable.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And "Enable" "icon" should exist in the "Guest access" "table_row"

  @javascript
  Scenario: Enabling enrolment method
    Given I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_enable.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And "Disable" "icon" should exist in the "Guest access" "table_row"

  @javascript
  Scenario: Disable an enrolment method
<<<<<<< HEAD
    Given I am on the "Course 1" "enrolment methods" page
=======
    Given I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I click on "Enable" "link" in the "Guest access" "table_row"
    And "Disable" "icon" should exist in the "Guest access" "table_row"
    And I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_disable.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And "Enable" "icon" should exist in the "Guest access" "table_row"

  @javascript
  Scenario: Delete an enrolment method
    Given I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_delete.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I should not see "Guest access" in the "generaltable" "table"

  @javascript
  Scenario: Delete an unexistent enrolment method (nothing should change)
<<<<<<< HEAD
    Given I am on the "Course 1" "enrolment methods" page
=======
    Given I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I click on "Delete" "link" in the "Guest access" "table_row"
    And I click on "Continue" "button"
    And I should not see "Guest access" in the "generaltable" "table"
    And I navigate to "Courses > Upload courses" in site administration
    And I upload "admin/tool/uploadcourse/tests/fixtures/enrolment_delete.csv" file to "File" filemanager
    And I set the field "Upload mode" to "Only update existing courses"
    And I set the field "Update mode" to "Update with CSV data only"
    And I set the field "Allow deletes" to "Yes"
    And I click on "Preview" "button"
    When I click on "Upload courses" "button"
    Then I should see "Course updated"
<<<<<<< HEAD
    And I am on the "Course 1" "enrolment methods" page
=======
    And I am on "Course 1" course homepage
    And I navigate to "Users > Enrolment methods" in current page administration
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I should not see "Guest access" in the "generaltable" "table"
