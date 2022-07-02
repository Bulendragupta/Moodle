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
/* jshint node: true, browser: false */
/* eslint-env node */

/**
 * Grunt configuration for Moodle.
 *
 * @copyright  2014 Andrew Nicols
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Setup the Grunt Moodle environment.
 *
 * @param   {Grunt} grunt
 * @returns {Object}
 */
const setupMoodleEnvironment = grunt => {
    const fs = require('fs');
    const path = require('path');
    const ComponentList = require(path.join(process.cwd(), '.grunt', 'components.js'));

    const getAmdConfiguration = () => {
        // If the cwd is the amd directory in the current component then it will be empty.
        // If the cwd is a child of the component's AMD directory, the relative directory will not start with ..
        let inAMD = !path.relative(`${componentDirectory}/amd`, cwd).startsWith('..');

        // Globbing pattern for matching all AMD JS source files.
        let amdSrc = [];
        if (inComponent) {
            amdSrc.push(
                componentDirectory + "/amd/src/*.js",
                componentDirectory + "/amd/src/**/*.js"
            );
        } else {
            amdSrc = ComponentList.getAmdSrcGlobList();
        }

        return {
            inAMD,
            amdSrc,
        };
    };

    const getYuiConfiguration = () => {
        let yuiSrc = [];
        if (inComponent) {
            yuiSrc.push(componentDirectory + "/yui/src/**/*.js");
        } else {
            yuiSrc = ComponentList.getYuiSrcGlobList(gruntFilePath + '/');
        }

        return {
            yuiSrc,
        };
    };

    const getStyleConfiguration = () => {
        const ComponentList = require(path.join(process.cwd(), '.grunt', 'components.js'));
        // Build the cssSrc and scssSrc.
        // Valid paths are:
        // [component]/styles.css; and either
        // [theme/[themename]]/scss/**/*.scss; or
        // [theme/[themename]]/style/*.css.
        //
        // If a theme has scss, then it is assumed that the style directory contains generated content.
        let cssSrc = [];
        let scssSrc = [];

        const checkComponentDirectory = componentDirectory => {
            const isTheme = componentDirectory.startsWith('theme/');
            if (isTheme) {
                const scssDirectory = `${componentDirectory}/scss`;

                if (fs.existsSync(scssDirectory)) {
                    // This theme has an SCSS directory.
                    // Include all scss files within it recursively, but do not check for css files.
                    scssSrc.push(`${scssDirectory}/*.scss`);
                    scssSrc.push(`${scssDirectory}/**/*.scss`);
                } else {
                    // This theme has no SCSS directory.
                    // Only hte CSS files in the top-level directory are checked.
                    cssSrc.push(`${componentDirectory}/style/*.css`);
                }
            } else {
                // This is not a theme.
                // All other plugin types are restricted to a single styles.css in their top level.
                cssSrc.push(`${componentDirectory}/styles.css`);
            }
        };

        if (inComponent) {
            checkComponentDirectory(componentDirectory);
        } else {
            ComponentList.getComponentPaths(`${gruntFilePath}/`).forEach(componentPath => {
                checkComponentDirectory(componentPath);
            });
        }

        return {
            cssSrc,
            scssSrc,
        };
    };

    /**
     * Calculate the cwd, taking into consideration the `root` option (for Windows).
     *
     * @param {Object} grunt
     * @returns {String} The current directory as best we can determine
     */
    const getCwd = grunt => {
        let cwd = fs.realpathSync(process.env.PWD || process.cwd());

        // Windows users can't run grunt in a subdirectory, so allow them to set
        // the root by passing --root=path/to/dir.
        if (grunt.option('root')) {
            const root = grunt.option('root');
            if (grunt.file.exists(__dirname, root)) {
                cwd = fs.realpathSync(path.join(__dirname, root));
                grunt.log.ok('Setting root to ' + cwd);
            } else {
                grunt.fail.fatal('Setting root to ' + root + ' failed - path does not exist');
            }
        }
<<<<<<< HEAD
=======
    }

    const scssTasks = ['sass'];
    if (hasScss) {
        scssTasks.unshift('stylelint:scss');
    }
    scssTasks.unshift('ignorefiles');
    grunt.registerTask('scss', scssTasks);

    const cssTasks = ['ignorefiles'];
    if (hasCss) {
        cssTasks.push('stylelint:css');
    }
    grunt.registerTask('rawcss', cssTasks);

    grunt.registerTask('css', ['scss', 'rawcss']);
};

/**
 * Grunt configuration.
 *
 * @param {Object} grunt
 */
module.exports = function(grunt) {
    const path = require('path');
    const tasks = {};
    const async = require('async');
    const DOMParser = require('xmldom').DOMParser;
    const xpath = require('xpath');
    const semver = require('semver');
    const watchman = require('fb-watchman');
    const watchmanClient = new watchman.Client();
    const fs = require('fs');
    const ComponentList = require(path.resolve('GruntfileComponents.js'));
    const sass = require('node-sass');
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

        return cwd;
    };

    // Detect directories:
    // * gruntFilePath          The real path on disk to this Gruntfile.js
    // * cwd                    The current working directory, which can be overridden by the `root` option
    // * relativeCwd            The cwd, relative to the Gruntfile.js
    // * componentDirectory     The root directory of the component if the cwd is in a valid component
    // * inComponent            Whether the cwd is in a valid component
    // * runDir                 The componentDirectory or cwd if not in a component, relative to Gruntfile.js
    // * fullRunDir             The full path to the runDir
    const gruntFilePath = fs.realpathSync(process.cwd());
    const cwd = getCwd(grunt);
    const relativeCwd = path.relative(gruntFilePath, cwd);
    const componentDirectory = ComponentList.getOwningComponentDirectory(relativeCwd);
    const inComponent = !!componentDirectory;
    const inTheme = !!componentDirectory && componentDirectory.startsWith('theme/');
    const runDir = inComponent ? componentDirectory : relativeCwd;
    const fullRunDir = fs.realpathSync(gruntFilePath + path.sep + runDir);
    const {inAMD, amdSrc} = getAmdConfiguration();
    const {yuiSrc} = getYuiConfiguration();
    const {cssSrc, scssSrc} = getStyleConfiguration();

    let files = null;
    if (grunt.option('files')) {
        // Accept a comma separated list of files to process.
        files = grunt.option('files').split(',');
    }

    grunt.log.debug('============================================================================');
    grunt.log.debug(`= Node version:        ${process.versions.node}`);
    grunt.log.debug(`= grunt version:       ${grunt.package.version}`);
    grunt.log.debug(`= process.cwd:         '` + process.cwd() + `'`);
    grunt.log.debug(`= process.env.PWD:     '${process.env.PWD}'`);
    grunt.log.debug(`= path.sep             '${path.sep}'`);
    grunt.log.debug('============================================================================');
    grunt.log.debug(`= gruntFilePath:       '${gruntFilePath}'`);
    grunt.log.debug(`= relativeCwd:         '${relativeCwd}'`);
    grunt.log.debug(`= componentDirectory:  '${componentDirectory}'`);
    grunt.log.debug(`= inComponent:         '${inComponent}'`);
    grunt.log.debug(`= runDir:              '${runDir}'`);
    grunt.log.debug(`= fullRunDir:          '${fullRunDir}'`);
    grunt.log.debug('============================================================================');

    if (inComponent) {
        grunt.log.ok(`Running tasks for component directory ${componentDirectory}`);
    }

    return {
        amdSrc,
        componentDirectory,
        cwd,
        cssSrc,
        files,
        fullRunDir,
        gruntFilePath,
        inAMD,
        inComponent,
        inTheme,
        relativeCwd,
        runDir,
        scssSrc,
        yuiSrc,
    };
};

/**
 * Verify tha tthe current NodeJS version matches the required version in package.json.
 *
 * @param   {Grunt} grunt
 */
const verifyNodeVersion = grunt => {
    const semver = require('semver');

    // Verify the node version is new enough.
    var expected = semver.validRange(grunt.file.readJSON('package.json').engines.node);
    var actual = semver.valid(process.version);
    if (!semver.satisfies(actual, expected)) {
        grunt.fail.fatal('Node version not satisfied. Require ' + expected + ', version installed: ' + actual);
    }
};

<<<<<<< HEAD
/**
 * Grunt configuration.
 *
 * @param {Grunt} grunt
 */
module.exports = function(grunt) {
    // Verify that the Node version meets our requirements.
    verifyNodeVersion(grunt);

    // Setup the Moodle environemnt within the Grunt object.
    grunt.moodleEnv = setupMoodleEnvironment(grunt);
=======
    const babelTransform = require('@babel/core').transform;
    const babel = (options = {}) => {
        return {
            name: 'babel',

            transform: (code, id) => {
                grunt.log.debug(`Transforming ${id}`);
                options.filename = id;
                const transformed = babelTransform(code, options);

                return {
                    code: transformed.code,
                    map: transformed.map
                };
            }
        };
    };

    // Note: We have to use a rate limit plugin here because rollup runs all tasks asynchronously and in parallel.
    // When we kick off a full run, if we kick off a rollup of every file this will fork-bomb the machine.
    // To work around this we use a concurrent Promise queue based on the number of available processors.
    const rateLimit = () => {
        const queue = [];
        let queueRunner;

        const startQueue = () => {
            if (queueRunner) {
                return;
            }

            queueRunner = setTimeout(() => {
                const limit = Math.max(1, require('os').cpus().length / 2);
                grunt.log.debug(`Starting rollup with queue size of ${limit}`);
                runQueue(limit);
            }, 100);
        };

        // The queue runner will run the next `size` items in the queue.
        const runQueue = (size = 1) => {
            queue.splice(0, size).forEach(resolve => {
                resolve();
            });
        };

        return {
            name: 'ratelimit',

            // The options hook is run in parallel.
            // We can return an unresolved Promise which is queued for later resolution.
            options: async() => {
                return new Promise(resolve => {
                    queue.push(resolve);
                    startQueue();
                });
            },

            // When an item in the queue completes, start the next item in the queue.
            buildEnd: () => {
                runQueue();
            },
        };
    };

    const terser = require('rollup-plugin-terser').terser;

    // Project configuration.
    grunt.initConfig({
        eslint: {
            // Even though warnings dont stop the build we don't display warnings by default because
            // at this moment we've got too many core warnings.
            // To display warnings call: grunt eslint --show-lint-warnings
            // To fail on warnings call: grunt eslint --max-lint-warnings=0
            // Also --max-lint-warnings=-1 can be used to display warnings but not fail.
            options: {
                quiet: (!grunt.option('show-lint-warnings')) && (typeof grunt.option('max-lint-warnings') === 'undefined'),
                maxWarnings: ((typeof grunt.option('max-lint-warnings') !== 'undefined') ? grunt.option('max-lint-warnings') : -1)
            },
            amd: {src: files ? files : amdSrc},
            // Check YUI module source files.
            yui: {src: files ? files : yuiSrc},
        },
        rollup: {
            dist: {
                options: {
                    format: 'esm',
                    dir: 'output',
                    sourcemap: true,
                    treeshake: false,
                    context: 'window',
                    plugins: [
                        rateLimit({initialDelay: 0}),
                        babel({
                            sourceMaps: true,
                            comments: false,
                            compact: false,
                            plugins: [
                                'transform-es2015-modules-amd-lazy',
                                'system-import-transformer',
                                // This plugin modifies the Babel transpiling for "export default"
                                // so that if it's used then only the exported value is returned
                                // by the generated AMD module.
                                //
                                // It also adds the Moodle plugin name to the AMD module definition
                                // so that it can be imported as expected in other modules.
                                path.resolve('babel-plugin-add-module-to-define.js'),
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-syntax-import-meta',
                                ['@babel/plugin-proposal-class-properties', {'loose': false}],
                                '@babel/plugin-proposal-json-strings'
                            ],
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        browsers: [
                                            ">0.25%",
                                            "last 2 versions",
                                            "not ie <= 10",
                                            "not op_mini all",
                                            "not Opera > 0",
                                            "not dead"
                                        ]
                                    },
                                    modules: false,
                                    useBuiltIns: false
                                }]
                            ]
                        }),

                        terser({
                            // Do not mangle variables.
                            // Makes debugging easier.
                            mangle: false,
                        }),
                    ],
                },
                files: [{
                    expand: true,
                    src: files ? files : amdSrc,
                    rename: babelRename
                }],
            },
        },
        jsdoc: {
            dist: {
                options: {
                    configure: ".grunt/jsdoc/jsdoc.conf.js",
                },
            },
        },
        sass: {
            dist: {
                files: {
                    "theme/boost/style/moodle.css": "theme/boost/scss/preset/default.scss",
                    "theme/classic/style/moodle.css": "theme/classic/scss/classicgrunt.scss"
                }
            },
            options: {
                implementation: sass,
                includePaths: ["theme/boost/scss/", "theme/classic/scss/"]
            }
        },
        watch: {
            options: {
                nospawn: true // We need not to spawn so config can be changed dynamically.
            },
            amd: {
                files: inComponent
                    ? ['amd/src/*.js', 'amd/src/**/*.js']
                    : ['**/amd/src/**/*.js'],
                tasks: ['amd']
            },
            boost: {
                files: [inComponent ? 'scss/**/*.scss' : 'theme/boost/scss/**/*.scss'],
                tasks: ['scss']
            },
            rawcss: {
                files: [
                    '**/*.css',
                ],
                excludes: [
                    '**/moodle.css',
                    '**/editor.css',
                ],
                tasks: ['rawcss']
            },
            yui: {
                files: inComponent
                    ? ['yui/src/*.json', 'yui/src/**/*.js']
                    : ['**/yui/src/**/*.js'],
                tasks: ['yui']
            },
            gherkinlint: {
                files: [inComponent ? 'tests/behat/*.feature' : '**/tests/behat/*.feature'],
                tasks: ['gherkinlint']
            }
        },
        shifter: {
            options: {
                recursive: true,
                // Shifter takes a relative path.
                paths: files ? files : [runDir]
            }
        },
        gherkinlint: {
            options: {
                files: getGherkinLintTargets(),
            }
        },
    });

    /**
     * Generate ignore files (utilising thirdpartylibs.xml data)
     */
    tasks.ignorefiles = function() {
        // An array of paths to third party directories.
        const thirdPartyPaths = getThirdPartyPathsFromXML();
        // Generate .eslintignore.
        const eslintIgnores = [
            '# Generated by "grunt ignorefiles"',
            '*/**/yui/src/*/meta/',
            '*/**/build/',
        ].concat(thirdPartyPaths);
        grunt.file.write('.eslintignore', eslintIgnores.join('\n') + '\n');

        // Generate .stylelintignore.
        const stylelintIgnores = [
            '# Generated by "grunt ignorefiles"',
            '**/yui/build/*',
            'theme/boost/style/moodle.css',
            'theme/classic/style/moodle.css',
        ].concat(thirdPartyPaths);
        grunt.file.write('.stylelintignore', stylelintIgnores.join('\n') + '\n');
    };
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

    /**
     * Add the named task.
     *
     * @param   {string} name
     * @param   {Grunt} grunt
     */
    const addTask = (name, grunt) => {
        const path = require('path');
        const taskPath = path.resolve(`./.grunt/tasks/${name}.js`);

        grunt.log.debug(`Including tasks for ${name} from ${taskPath}`);

        require(path.resolve(`./.grunt/tasks/${name}.js`))(grunt);
    };

    // Startup tasks.
    grunt.moodleEnv.startupTasks = [];

    // Add Moodle task configuration.
    addTask('gherkinlint', grunt);
    addTask('ignorefiles', grunt);

    addTask('javascript', grunt);
    addTask('style', grunt);
    addTask('componentlibrary', grunt);

<<<<<<< HEAD
    addTask('watch', grunt);
    addTask('startup', grunt);
=======
    // On watch, we dynamically modify config to build only affected files. This
    // method is slightly complicated to deal with multiple changed files at once (copied
    // from the grunt-contrib-watch readme).
    var changedFiles = Object.create(null);
    var onChange = grunt.util._.debounce(function() {
        var files = Object.keys(changedFiles);
        grunt.config('eslint.amd.src', files);
        grunt.config('eslint.yui.src', files);
        grunt.config('shifter.options.paths', files);
        grunt.config('gherkinlint.options.files', files);
        grunt.config('babel.dist.files', [{expand: true, src: files, rename: babelRename}]);
        changedFiles = Object.create(null);
    }, 200);

    grunt.event.on('watch', function(action, filepath) {
        changedFiles[filepath] = action;
        onChange();
    });

    // Register NPM tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-stylelint');
    grunt.loadNpmTasks('grunt-rollup');

    grunt.loadNpmTasks('grunt-jsdoc');

    // Rename the grunt-contrib-watch "watch" task because we're going to wrap it.
    grunt.renameTask('watch', 'watch-grunt');

    // Register JS tasks.
    grunt.registerTask('shifter', 'Run Shifter against the current directory', tasks.shifter);
    grunt.registerTask('gherkinlint', 'Run gherkinlint against the current directory', tasks.gherkinlint);
    grunt.registerTask('ignorefiles', 'Generate ignore files for linters', tasks.ignorefiles);
    grunt.registerTask('watch', 'Run tasks on file changes', tasks.watch);
    grunt.registerTask('yui', ['eslint:yui', 'shifter']);
    grunt.registerTask('amd', ['ignorefiles', 'eslint:amd', 'rollup']);
    grunt.registerTask('js', ['amd', 'yui']);

    // Register CSS tasks.
    registerStyleLintTasks(grunt, files, fullRunDir);

    // Register the startup task.
    grunt.registerTask('startup', 'Run the correct tasks for the current directory', tasks.startup);
>>>>>>> 82a1143541c07fd468250ec9d6103d16e68bd8ef

    // Register the default task.
    grunt.registerTask('default', ['startup']);
};
