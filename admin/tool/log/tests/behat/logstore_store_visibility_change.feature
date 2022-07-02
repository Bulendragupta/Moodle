@tool_log @report @report_configlog
Feature: In a report, admin can see logstore visibility changes

  # Change log stores visibility so the report contains known data.
  Background:
    Given I log in as "admin"
    And the following config values are set as admin:
      | enabled_stores | logstore_standard  | tool_log |

  @javascript
  Scenario: Display configuration changes report
    When I navigate to "Plugins > Logging > Manage log stores" in site administration
    And I click on "Disable" "icon" in the "Standard log" "table_row"
    And I click on "Enable" "icon" in the "External database log" "table_row"
    And I navigate to "Reports > Config changes" in site administration
<<<<<<< HEAD
    Then the following should exist in the "reportbuilder-table" table:
=======
    Then the following should exist in the "report-configlog-report-table" table:
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
      | User       | Plugin               | Setting                  | New value | Original value |
      | Admin User | logstore_standard    | tool_logstore_visibility | 0         | 1              |
      | Admin User | logstore_database    | tool_logstore_visibility | 1         | 0              |
