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

/**
 * Scheduled allocator that internally executes the random one
 *
 * @package     workshopallocation_scheduled
 * @subpackage  mod_workshop
 * @copyright   2012 David Mudrak <david@moodle.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->component  = 'workshopallocation_scheduled';
<<<<<<< HEAD
$plugin->version    = 2022041900;
$plugin->requires   = 2022041200;
$plugin->dependencies = array(
    'workshopallocation_random'  => 2022041200,
=======
$plugin->version    = 2020110900;
$plugin->requires   = 2020110300;
$plugin->dependencies = array(
    'workshopallocation_random'  => 2020110300,
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
);
$plugin->maturity   = MATURITY_STABLE;
