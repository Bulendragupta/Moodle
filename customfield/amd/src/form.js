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
 * Custom Field interaction management for Moodle.
 *
 * @module     core_customfield/form
 * @copyright  2018 Toni Barbera
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
<<<<<<< HEAD

import 'core/inplace_editable';
import {call as fetchMany} from 'core/ajax';
import {
    get_string as getString,
    get_strings as getStrings,
} from 'core/str';
import ModalForm from 'core_form/modalform';
import Notification from 'core/notification';
import Pending from 'core/pending';
import SortableList from 'core/sortable_list';
import Templates from 'core/templates';
import jQuery from 'jquery';

/**
 * Display confirmation dialogue
 *
 * @param {Number} id
 * @param {String} type
 * @param {String} component
 * @param {String} area
 * @param {Number} itemid
 */
const confirmDelete = (id, type, component, area, itemid) => {
    const pendingPromise = new Pending('core_customfield/form:confirmDelete');

    getStrings([
        {'key': 'confirm'},
        {'key': 'confirmdelete' + type, component: 'core_customfield'},
        {'key': 'yes'},
        {'key': 'no'},
    ])
    .then(strings => {
        return Notification.confirm(strings[0], strings[1], strings[2], strings[3], function() {
            const pendingDeletePromise = new Pending('core_customfield/form:confirmDelete');
            fetchMany([
                {
                    methodname: (type === 'field') ? 'core_customfield_delete_field' : 'core_customfield_delete_category',
                    args: {id},
                },
                {methodname: 'core_customfield_reload_template', args: {component, area, itemid}}
            ])[1]
            .then(response => Templates.render('core_customfield/list', response))
            .then((html, js) => Templates.replaceNode(jQuery('[data-region="list-page"]'), html, js))
            .then(pendingDeletePromise.resolve)
            .catch(Notification.exception);
        });
    })
    .then(pendingPromise.resolve)
    .catch(Notification.exception);
};


/**
 * Creates a new custom fields category with default name and updates the list
 *
 * @param {String} component
 * @param {String} area
 * @param {Number} itemid
 */
const createNewCategory = (component, area, itemid) => {
    const pendingPromise = new Pending('core_customfield/form:createNewCategory');
    const promises = fetchMany([
        {methodname: 'core_customfield_create_category', args: {component, area, itemid}},
        {methodname: 'core_customfield_reload_template', args: {component, area, itemid}}
    ]);

    promises[1].then(response => Templates.render('core_customfield/list', response))
    .then((html, js) => Templates.replaceNode(jQuery('[data-region="list-page"]'), html, js))
    .then(() => pendingPromise.resolve())
    .catch(Notification.exception);
};

/**
 * Create new custom field
 *
 * @param {HTMLElement} element
 * @param {String} component
 * @param {String} area
 * @param {Number} itemid
 */
const createNewField = (element, component, area, itemid) => {
    const pendingPromise = new Pending('core_customfield/form:createNewField');

    const returnFocus = element.closest(".action-menu").querySelector(".dropdown-toggle");
    const form = new ModalForm({
        formClass: "core_customfield\\field_config_form",
        args: {
            categoryid: element.getAttribute('data-categoryid'),
            type: element.getAttribute('data-type'),
        },
        modalConfig: {
            title: getString('addingnewcustomfield', 'core_customfield', element.getAttribute('data-typename')),
        },
        returnFocus,
    });

    form.addEventListener(form.events.FORM_SUBMITTED, () => {
        const pendingCreatedPromise = new Pending('core_customfield/form:createdNewField');
        const promises = fetchMany([
            {methodname: 'core_customfield_reload_template', args: {component: component, area: area, itemid: itemid}}
        ]);

        promises[0].then(response => Templates.render('core_customfield/list', response))
        .then((html, js) => Templates.replaceNode(jQuery('[data-region="list-page"]'), html, js))
        .then(() => pendingCreatedPromise.resolve())
        .catch(() => window.location.reload());
    });

    form.show();

    pendingPromise.resolve();
};

/**
 * Edit custom field
 *
 * @param {HTMLElement} element
 * @param {String} component
 * @param {String} area
 * @param {Number} itemid
 */
const editField = (element, component, area, itemid) => {
    const pendingPromise = new Pending('core_customfield/form:editField');

    const form = new ModalForm({
        formClass: "core_customfield\\field_config_form",
        args: {
            id: element.getAttribute('data-id'),
        },
        modalConfig: {
            title: getString('editingfield', 'core_customfield', element.getAttribute('data-name')),
        },
        returnFocus: element,
    });

    form.addEventListener(form.events.FORM_SUBMITTED, () => {
        const pendingCreatedPromise = new Pending('core_customfield/form:createdNewField');
        const promises = fetchMany([
            {methodname: 'core_customfield_reload_template', args: {component: component, area: area, itemid: itemid}}
        ]);

        promises[0].then(response => Templates.render('core_customfield/list', response))
        .then((html, js) => Templates.replaceNode(jQuery('[data-region="list-page"]'), html, js))
        .then(() => pendingCreatedPromise.resolve())
        .catch(() => window.location.reload());
    });

    form.show();

    pendingPromise.resolve();
};

/**
 * Fetch the category name from an inplace editable, given a child node of that field.
 *
 * @param {NodeElement} nodeElement
 * @returns {String}
 */
const getCategoryNameFor = nodeElement => nodeElement
    .closest('[data-category-id]')
    .find('[data-inplaceeditable][data-itemtype=category][data-component=core_customfield]')
    .attr('data-value');

const setupSortableLists = rootNode => {
    // Sort category.
    const sortCat = new SortableList(
        '#customfield_catlist .categorieslist',
        {
            moveHandlerSelector: '.movecategory [data-drag-type=move]',
        }
    );
    sortCat.getElementName = nodeElement => Promise.resolve(getCategoryNameFor(nodeElement));
=======
define([
    'jquery',
    'core/str',
    'core/notification',
    'core/ajax',
    'core/templates',
    'core/sortable_list',
    'core/pending',
    'core/inplace_editable',
], function($, Str, Notification, Ajax, Templates, SortableList, Pending) {

    /**
     * Display confirmation dialogue
     *
     * @param {Number} id
     * @param {String} type
     * @param {String} component
     * @param {String} area
     * @param {Number} itemid
     */
    var confirmDelete = function(id, type, component, area, itemid) {
        var pendingPromise = new Pending('core_customfield/form:confirmDelete');
        Str.get_strings([
            {'key': 'confirm'},
            {'key': 'confirmdelete' + type, component: 'core_customfield'},
            {'key': 'yes'},
            {'key': 'no'},
        ])
        .then(function(s) {
            Notification.confirm(s[0], s[1], s[2], s[3], function() {
                var pendingDeletePromise = new Pending('core_customfield/form:confirmDelete');
                var func = (type === 'field') ? 'core_customfield_delete_field' : 'core_customfield_delete_category';
                Ajax.call([
                    {methodname: func, args: {id: id}},
                    {methodname: 'core_customfield_reload_template', args: {component: component, area: area, itemid: itemid}}
                ])[1]
                .then(function(response) {
                    return Templates.render('core_customfield/list', response);
                })
                .then(function(html, js) {
                    Templates.replaceNode($('[data-region="list-page"]'), html, js);
                    return null;
                })
                .then(pendingDeletePromise.resolve)
                .catch(Notification.exception);
            });

            return;
        })
        .then(pendingPromise.resolve)
        .catch(Notification.exception);
    };

    /**
     * Creates a new custom fields category with default name and updates the list
     *
     * @param {String} component
     * @param {String} area
     * @param {Number} itemid
     */
    var createNewCategory = function(component, area, itemid) {
        var pendingPromise = new Pending('core_customfield/form:confirmDelete');
        var promises = Ajax.call([
            {methodname: 'core_customfield_create_category', args: {component: component, area: area, itemid: itemid}},
            {methodname: 'core_customfield_reload_template', args: {component: component, area: area, itemid: itemid}}
        ]);
        var categoryid;

        promises[0].then(function(response) {
            categoryid = response;
            return null;
        }).catch(Notification.exception);

        promises[1].then(function(response) {
            return Templates.render('core_customfield/list', response);
        })
        .then(function(html, js) {
            Templates.replaceNode($('[data-region="list-page"]'), html, js);
            window.location.href = '#category-' + categoryid;
            return null;
        })
        .catch(Notification.exception);

        Promise.all(promises)
        .then(pendingPromise.resolve)
        .catch();
    };

    return {
        /**
         * Initialise the custom fields manager
         */
        init: function() {
            var mainlist = $('#customfield_catlist');
            var component = mainlist.attr('data-component');
            var area = mainlist.attr('data-area');
            var itemid = mainlist.attr('data-itemid');

            $("[data-role=deletefield]").on('click', function(e) {
                confirmDelete($(this).attr('data-id'), 'field', component, area, itemid);
                e.preventDefault();
            });

            $("[data-role=deletecategory]").on('click', function(e) {
                confirmDelete($(this).attr('data-id'), 'category', component, area, itemid);
                e.preventDefault();
            });

            $('[data-role=addnewcategory]').on('click', function() {
                createNewCategory(component, area, itemid);
            });

            var categoryName = function(element) {
                return element
                    .closest('[data-category-id]')
                    .find('[data-inplaceeditable][data-itemtype=category][data-component=core_customfield]')
                    .attr('data-value');
            };

            // Sort category.
            var sortCat = new SortableList(
                $('#customfield_catlist .categorieslist'),
                {moveHandlerSelector: '.movecategory [data-drag-type=move]'}
            );

            sortCat.getElementName = function(el) {
                return $.Deferred().resolve(categoryName(el));
            };

            $('[data-category-id]').on('sortablelist-drop', function(evt, info) {
                if (info.positionChanged) {
                    var pendingPromise = new Pending('core_customfield/form:categoryid:on:sortablelist-drop');
                    Ajax.call([
                        {
                            methodname: 'core_customfield_move_category',
                            args: {
                                id: info.element.data('category-id'),
                                beforeid: info.targetNextElement.data('category-id')
                            }

                        },
                    ])[0]
                    .then(pendingPromise.resolve)
                    .catch(Notification.exception);
                }
                evt.stopPropagation(); // Important for nested lists to prevent multiple targets.
            });
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

    // Note: The sortable list currently uses jQuery events.
    jQuery('[data-category-id]').on(SortableList.EVENTS.DROP, (evt, info) => {
        if (info.positionChanged) {
            const pendingPromise = new Pending('core_customfield/form:categoryid:on:sortablelist-drop');
            fetchMany([{
                methodname: 'core_customfield_move_category',
                args: {
                    id: info.element.data('category-id'),
                    beforeid: info.targetNextElement.data('category-id')
                }
<<<<<<< HEAD

            }])[0]
            .then(pendingPromise.resolve)
            .catch(Notification.exception);
        }
        evt.stopPropagation(); // Important for nested lists to prevent multiple targets.
    });

    // Sort fields.
    var sort = new SortableList(
        '#customfield_catlist .fieldslist tbody',
        {
            moveHandlerSelector: '.movefield [data-drag-type=move]',
        }
    );

    sort.getDestinationName = (parentElement, afterElement) => {
        if (!afterElement.length) {
            return getString('totopofcategory', 'customfield', getCategoryNameFor(parentElement));
        } else if (afterElement.attr('data-field-name')) {
            return getString('afterfield', 'customfield', afterElement.attr('data-field-name'));
        } else {
            return Promise.resolve('');
        }
    };

    jQuery('[data-field-name]').on(SortableList.EVENTS.DROP, (evt, info) => {
        if (info.positionChanged) {
            const pendingPromise = new Pending('core_customfield/form:fieldname:on:sortablelist-drop');
            fetchMany([{
                methodname: 'core_customfield_move_field',
                args: {
                    id: info.element.data('field-id'),
                    beforeid: info.targetNextElement.data('field-id'),
                    categoryid: Number(info.targetList.closest('[data-category-id]').attr('data-category-id'))
                },
            }])[0]
            .then(pendingPromise.resolve)
            .catch(Notification.exception);
        }
        evt.stopPropagation(); // Important for nested lists to prevent multiple targets.
    });

    jQuery('[data-field-name]').on(SortableList.EVENTS.DRAG, evt => {
        var pendingPromise = new Pending('core_customfield/form:fieldname:on:sortablelist-drag');

        evt.stopPropagation(); // Important for nested lists to prevent multiple targets.

        // Refreshing fields tables.
        Templates.render('core_customfield/nofields', {})
        .then(html => {
            rootNode.querySelectorAll('.categorieslist > *')
            .forEach(category => {
                const fields = category.querySelectorAll('.field:not(.sortable-list-is-dragged)');
                const noFields = category.querySelector('.nofields');

                if (!fields.length && !noFields) {
                    category.querySelector('tbody').innerHTML = html;
                } else if (fields.length && noFields) {
                    noFields.remove();
                }
=======
            };

            $('[data-field-name]').on('sortablelist-drop', function(evt, info) {
                evt.stopPropagation(); // Important for nested lists to prevent multiple targets.
                if (info.positionChanged) {
                    var pendingPromise = new Pending('core_customfield/form:fieldname:on:sortablelist-drop');
                    Ajax.call([
                        {
                            methodname: 'core_customfield_move_field',
                            args: {
                                id: info.element.data('field-id'),
                                beforeid: info.targetNextElement.data('field-id'),
                                categoryid: Number(info.targetList.closest('[data-category-id]').attr('data-category-id'))
                            },
                        },
                    ])[0]
                    .then(pendingPromise.resolve)
                    .catch(Notification.exception);
                }
            });

            $('[data-field-name]').on('sortablelist-drag', function(evt) {
                var pendingPromise = new Pending('core_customfield/form:fieldname:on:sortablelist-drag');

                evt.stopPropagation(); // Important for nested lists to prevent multiple targets.

                // Refreshing fields tables.
                Str.get_string('therearenofields', 'core_customfield').then(function(s) {
                    $('#customfield_catlist .categorieslist').children().each(function() {
                        var fields = $(this).find($('.field')),
                            nofields = $(this).find($('.nofields'));
                        if (!fields.length && !nofields.length) {
                            $(this).find('tbody').append(
                                '<tr class="nofields"><td colspan="5">' + s + '</td></tr>'
                            );
                        }
                        if (fields.length && nofields.length) {
                            nofields.remove();
                        }
                    });
                    return null;
                })
                .then(pendingPromise.resolve)
                .catch(Notification.exception);
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef
            });
            return;
        })
        .then(pendingPromise.resolve)
        .catch(Notification.exception);
    });

    jQuery('[data-category-id], [data-field-name]').on(SortableList.EVENTS.DRAGSTART, (evt, info) => {
        setTimeout(() => {
            jQuery('.sortable-list-is-dragged').width(info.element.width());
        }, 501);
    });
};

/**
 * Initialise the custom fields manager.
 */
export const init = () => {
    const rootNode = document.querySelector('#customfield_catlist');

    const component = rootNode.dataset.component;
    const area = rootNode.dataset.area;
    const itemid = rootNode.dataset.itemid;

    rootNode.addEventListener('click', e => {
        const roleHolder = e.target.closest('[data-role]');
        if (!roleHolder) {
            return;
        }

        if (roleHolder.dataset.role === 'deletefield') {
            e.preventDefault();

            confirmDelete(roleHolder.dataset.id, 'field', component, area, itemid);
            return;
        }

        if (roleHolder.dataset.role === 'deletecategory') {
            e.preventDefault();

            confirmDelete(roleHolder.dataset.id, 'category', component, area, itemid);
            return;
        }

        if (roleHolder.dataset.role === 'addnewcategory') {
            e.preventDefault();
            createNewCategory(component, area, itemid);

            return;
        }

        if (roleHolder.dataset.role === 'addfield') {
            e.preventDefault();
            createNewField(roleHolder, component, area, itemid);

            return;
        }

        if (roleHolder.dataset.role === 'editfield') {
            e.preventDefault();
            editField(roleHolder, component, area, itemid);

            return;
        }
    });

    setupSortableLists(rootNode, component, area, itemid);
};
