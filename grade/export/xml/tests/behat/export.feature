@gradeexport @gradeexport_xml
Feature: I need to export grades as xml
  In order to easily review marks
  As a teacher
  I need to have a export grades as xml

  Background:
    Given the following "courses" exist:
      | fullname | shortname | category | groupmode |
      | Course 1 | C1 | 0 | 1 |
    And the following "users" exist:
      | username | firstname | lastname | email | idnumber |
      | teacher1 | Teacher | 1 | teacher1@example.com | t1 |
      | student1 | Student | 1 | student1@example.com | s1 |
      | student2 | Student | 2 | student2@example.com | 'Bill'&"Ben"<tag>Hello</tag> |
    And the following "course enrolments" exist:
      | user | course | role |
      | teacher1 | C1 | editingteacher |
      | student1 | C1 | student |
      | student2 | C1 | student |
    And the following "activities" exist:
      | activity | course | idnumber | name | intro |
      | assign | C1 | a1 | Test assignment name | Submit something! |
    And I log in as "teacher1"
    And I am on "Course 1" course homepage
    And I navigate to "View > Grader report" in the course gradebook
    And I turn editing mode on
    And I give the grade "80.00" to the user "Student 1" for the grade item "Test assignment name"
    And I give the grade "42.00" to the user "Student 2" for the grade item "Test assignment name"
    And I press "Save changes"

  @javascript
  Scenario: Export grades as XML
<<<<<<< HEAD
    When I navigate to "XML file" export page in the course gradebook
=======
    When I navigate to "Export > XML file" in the course gradebook
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I expand all fieldsets
    And I set the field "Grade export decimal places" to "1"
    And I press "Download"
    Then I should see "s1" in the "//results//result[1]//student" "xpath_element"
    And I should see "a1" in the "//results//result[1]//assignment" "xpath_element"
    And I should see "80.0" in the "//results//result[1]//score" "xpath_element"
    And I should not see "80.00" in the "//results//result[1]//score" "xpath_element"
    # Ensure we have the encoded ID number of student 2.
    And I should see "'Bill'&\"Ben\"<tag>Hello</tag>" in the "//results//result[2]//student" "xpath_element"
    And I should see "a1" in the "//results//result[2]//assignment" "xpath_element"
    And I should see "42.0" in the "//results//result[2]//score" "xpath_element"
    And I should not see "42.00" in the "//results//result[2]//score" "xpath_element"
