<<<<<<< HEAD
@core @core_contentbank @core_h5p @contenttype_h5p @_file_upload @_switch_iframe @javascript
=======
@core @core_contentbank @contenttype_h5p @_file_upload @_switch_iframe @javascript
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
Feature: Replace H5P file from an existing content requires special capabilities
  In order replace an H5P content from the content bank
  As a teacher
  I need to be able to replace the content only if certain capabilities are allowed

  Background:
<<<<<<< HEAD
    Given I log in as "admin"
    And I navigate to "H5P > Manage H5P content types" in site administration
    And I upload "h5p/tests/fixtures/ipsums.h5p" file to "H5P content type" filemanager
    And I click on "Upload H5P content types" "button" in the "#fitem_id_uploadlibraries" "css_element"
    And I upload "h5p/tests/fixtures/filltheblanks.h5p" file to "H5P content type" filemanager
    And I click on "Upload H5P content types" "button" in the "#fitem_id_uploadlibraries" "css_element"
    And the following "users" exist:
=======
    Given the following "users" exist:
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
      | username | firstname | lastname | email                |
      | teacher1 | Teacher   | 1        | teacher1@example.com |
    And the following "categories" exist:
      | name  | category | idnumber |
      | Cat 1 | 0        | CAT1     |
    And the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | CAT1     |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | teacher1 | C1     | editingteacher |
    And the following "contentbank content" exist:
      | contextlevel | reference | contenttype     | user     | contentname       | filepath                              |
      | Course       | C1        | contenttype_h5p | admin    | admincontent      | /h5p/tests/fixtures/ipsums.h5p        |
      | Course       | C1        | contenttype_h5p | teacher1 | teachercontent    | /h5p/tests/fixtures/filltheblanks.h5p |
<<<<<<< HEAD
    And I log out
    And I log in as "teacher1"
    And I am on "Course 1" course homepage with editing mode on
    And the following config values are set as admin:
      | unaddableblocks | | theme_boost|
=======
    And I log in as "teacher1"
    And I am on "Course 1" course homepage with editing mode on
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I add the "Navigation" block if not present
    And I expand "Site pages" node
    And I click on "Content bank" "link"
    # Force the content deploy
    And I click on "admincontent" "link"
<<<<<<< HEAD
    And I am on "Course 1" course homepage
    And I expand "Site pages" node
=======
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I click on "Content bank" "link"

  Scenario: Teacher can replace its own H5P files
    Given I click on "teachercontent" "link"
<<<<<<< HEAD
    When I click on "More" "button"
    And I click on "Replace with file" "link"
=======
    When I open the action menu in "region-main-settings-menu" "region"
    And I choose "Replace with file" in the open action menu
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I upload "h5p/tests/fixtures/ipsums.h5p" file to "Upload content" filemanager
    And I click on "Save changes" "button"
    Then I switch to "h5p-player" class iframe
    And I switch to "h5p-iframe" class iframe
    And I should see "Lorum ipsum"
    And I switch to the main frame

  Scenario: Teacher cannot replace another user's H5P files
    When I click on "admincontent" "link"
<<<<<<< HEAD
    And I click on "More" "button"
    Then I should not see "Replace with file"
=======
    Then "Replace with file" "link" should not exist in the "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

  Scenario: Teacher cannot replace a content without having upload capability
    Given the following "permission overrides" exist:
      | capability                | permission | role           | contextlevel | reference |
      | moodle/contentbank:upload | Prevent    | editingteacher | Course       | C1        |
    When I click on "teachercontent" "link"
<<<<<<< HEAD
    And I click on "More" "button"
    Then I should not see "Replace with file"
=======
    Then "Replace with file" "link" should not exist in the "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

  Scenario: Teacher cannot replace a content without having the H5P upload capability
    Given the following "permission overrides" exist:
      | capability             | permission | role           | contextlevel | reference |
      | contenttype/h5p:upload | Prevent    | editingteacher | Course       | C1        |
    When I click on "teachercontent" "link"
<<<<<<< HEAD
    And I click on "More" "button"
    Then I should not see "Replace with file"
=======
    Then "Replace with file" "link" should not exist in the "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

  Scenario: Teacher cannot replace a content without having the manage own content capability
    Given the following "permission overrides" exist:
      | capability                          | permission | role           | contextlevel | reference |
      | moodle/contentbank:manageowncontent | Prevent    | editingteacher | Course       | C1        |
    When I click on "teachercontent" "link"
<<<<<<< HEAD
    And I click on "More" "button"
    Then I should not see "Replace with file"
=======
    Then "Replace with file" "link" should not exist in the "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
