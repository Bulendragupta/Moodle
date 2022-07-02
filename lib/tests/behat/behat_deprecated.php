<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

// NOTE: no MOODLE_INTERNAL test here, this file may be required by behat before including /config.php.

require_once(__DIR__ . '/../../../lib/behat/behat_deprecated_base.php');

use Behat\Mink\Exception\ElementNotFoundException as ElementNotFoundException;

/**
 * Steps definitions that are now deprecated and will be removed in the next releases.
 *
 * This file only contains the steps that previously were in the behat_*.php files in the SAME DIRECTORY.
 * When deprecating steps from other components or plugins, create a behat_COMPONENT_deprecated.php
 * file in the same directory where the steps were defined.
 *
 * @package    core
 * @category   test
 * @copyright  2013 David Monllaó
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class behat_deprecated extends behat_deprecated_base {

    /**
<<<<<<< HEAD
     * Clicks link with specified id|title|alt|text in the flat navigation drawer.
=======
     * Docks a block. Editing mode should be previously enabled.
     * @throws ExpectationException
     * @param string $blockname
     * @return void
     * @deprecated since Moodle 3.7 MDL-64506 - please do not use this definition step any more.
     * @todo MDL-65215 This will be deleted in Moodle 3.11.
     */
    public function i_dock_block($blockname) {

        $message = "Block docking is no longer used as of MDL-64506. Please update your tests.";
        $this->deprecated_message($message);

        // Looking for both title and alt.
        $xpath = "//input[@type='image'][@title='" . get_string('dockblock', 'block', $blockname) . "' or @alt='" . get_string('addtodock', 'block') . "']";
        $this->execute('behat_general::i_click_on_in_the',
                array($xpath, "xpath_element", $this->escape($blockname), "block")
        );
    }

    /**
     * Throws an exception if $CFG->behat_usedeprecated is not allowed.
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
     *
     * @When /^I select "(?P<link_string>(?:[^"]|\\")*)" from flat navigation drawer$/
     * @param string $link
     * @deprecated Since Moodle 4.0
     */
    public function i_select_from_flat_navigation_drawer(string $link) {
        $this->deprecated_message(['i_select_from_primary_navigation', 'i_select_from_secondary_navigation']);

        $this->execute('behat_navigation::i_open_flat_navigation_drawer');
        $this->execute('behat_general::i_click_on_in_the', [$link, 'link', '#nav-drawer', 'css_element']);
    }
}
