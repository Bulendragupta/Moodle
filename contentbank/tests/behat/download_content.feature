<<<<<<< HEAD
@core @core_contentbank @core_h5p @contentbank_h5p @_file_upload @javascript
=======
@core @core_contentbank @contentbank_h5p @_file_upload @javascript
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
Feature: Download H5P content from the content bank
  In order export H5P content from the content bank
  As an admin
  I need to be able to download any H5P content from the content bank

  Background:
    Given the following "users" exist:
      | username    | firstname | lastname | email              |
      | manager     | Max       | Manager  | man@example.com    |
    And the following "role assigns" exist:
      | user        | role      | contextlevel  | reference     |
      | manager     | manager   | System        |               |
    And the following "contentbank content" exist:
      | contextlevel | reference | contenttype     | user    | contentname              | filepath                               |
      | System       |           | contenttype_h5p | admin   | filltheblanksadmin.h5p   | /h5p/tests/fixtures/filltheblanks.h5p  |
      | System       |           | contenttype_h5p | manager | filltheblanksmanager.h5p | /h5p/tests/fixtures/filltheblanks.h5p  |
    And I log in as "admin"
    And I am on site homepage
    And I turn editing mode on
<<<<<<< HEAD
    And the following config values are set as admin:
      | unaddableblocks | | theme_boost|
=======
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    And I add the "Navigation" block if not present
    And I configure the "Navigation" block
    And I set the following fields to these values:
      | Page contexts | Display throughout the entire site |
    And I press "Save changes"

  Scenario: Admins can download content from the content bank
    Given I click on "Site pages" "list_item" in the "Navigation" "block"
    And I click on "Content bank" "link" in the "Navigation" "block"
    And I follow "filltheblanksmanager.h5p"
<<<<<<< HEAD
    And  I click on "More" "button"
    And I should see "Download"
    When I click on "Download" "link"
=======
    And I open the action menu in "region-main-settings-menu" "region"
    And I should see "Download"
    When I choose "Download" in the open action menu
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    Then I should see "filltheblanksmanager.h5p"

  Scenario: Users can download content created by different users
    Given the following "permission overrides" exist:
      | capability                            | permission | role    | contextlevel | reference |
      | moodle/contentbank:manageanycontent   | Prohibit   | manager | System       |           |
    And I log out
    And I log in as "manager"
    When I click on "Site pages" "list_item" in the "Navigation" "block"
    And I click on "Content bank" "link" in the "Navigation" "block"
    And I should see "filltheblanksadmin.h5p"
    And I follow "filltheblanksadmin.h5p"
<<<<<<< HEAD
    And  I click on "More" "button"
=======
    And I open the action menu in "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    Then I should see "Download"
    And I should not see "Rename"

  Scenario: Users without the required capability cannot download content
    Given the following "permission overrides" exist:
      | capability                            | permission | role    | contextlevel | reference |
      | moodle/contentbank:downloadcontent    | Prohibit   | manager | System       |           |
    And I log out
    And I log in as "manager"
    When I click on "Site pages" "list_item" in the "Navigation" "block"
    And I click on "Content bank" "link" in the "Navigation" "block"
    And I should see "filltheblanksmanager.h5p"
    And I follow "filltheblanksmanager.h5p"
<<<<<<< HEAD
    And  I click on "More" "button"
=======
    And I open the action menu in "region-main-settings-menu" "region"
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
    Then I should not see "Download"
