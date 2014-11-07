// Generated on 2014-07-21 using generator-ember 0.8.4
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var fs = require("fs");

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        fs: fs
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            emberTemplates: {
                files: '<%= yeoman.app %>/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            compass: {
                files: [
                  '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.{scss,sass}',
                ],
                tasks: ['compass:server']
            },
            neuter: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['neuter']
            },
            tests: {
                files: [
                  '<%= yeoman.app %>/tests/{unit,integration}/{,*/}*.js'
                ],
                tasks: ['concat']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '.tmp/scripts/*.js',
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.{css,scss}',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: {
              files: [{
                dot: true,
                src: [
                  '.tmp',
                  '<%= yeoman.app %>/*processed*'
                ]
              }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
          options: {
            separator: '\n\r'
          },
          integration_tests: {
            src: [
                    '<%= yeoman.app %>/tests/integration/fixtures/*.js',
                    '<%= yeoman.app %>/tests/integration/index.js',
                    '<%= yeoman.app %>/tests/integration/tests/*.js'
                  ],
            dest: '.tmp/int_tests.js'
          },
          unit_tests: {
            src: [
                    '<%= yeoman.app %>/tests/unit/index.js',
                    '<%= yeoman.app %>/tests/unit/*/*.js'
                  ],
            dest: '.tmp/tests.js'
          }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        config: {
          dev: {
            options: {
              variables: {
                'environment': 'development',
                'host': 'http://127.0.0.1:5000',
                'apiKey': '<%= yeoman.fs.readFileSync(".api_key") %>'
              }
            }
          },
          prod: {
            options: {
              variables: {
                'environment': 'production',
                'host': 'http://54.72.7.91:8888',
                'apiKey': '<%= yeoman.fs.readFileSync(".prod_api_key") %>'
              }
            }
          },
          test: {
            options: {
              variables: {
                'TEST': true,
                'environment': 'test',
                'host': 'http://127.0.0.1:5000', //This should be removed?
                'apiKey': '<%= yeoman.fs.readFileSync(".api_key") %>'
              }
            }
          },
          unit_test: {
            options: {
              variables: {
                'TEST': true,
                'UNIT_TEST': true,
                'environment': 'test',
                'host': 'http://127.0.0.1:5000', //This should be removed?
                'apiKey': '<%= yeoman.fs.readFileSync(".api_key") %>'
              }
            }
          },
          integration_test: {
            options: {
              variables: {
                'TEST': true,
                'INTEGRATION_TEST': true,
                'environment': 'test',
                'host': 'http://127.0.0.1:5000', //This should be removed?
                'apiKey': '<%= yeoman.fs.readFileSync(".api_key") %>'
              }
            }
          },
        },
        preprocess: {
          default: {
            src: '<%= yeoman.app %>/index.html',
            dest: '<%= yeoman.app %>/index.processed.html',
            options: {
              context: {
                TEST: false,
                UNIT_TEST: false,
                INTEGRATION_TEST: false
              }
            }
          },
          unit_test: {
            src: '<%= yeoman.app %>/index.html',
            dest: '<%= yeoman.app %>/index.processed.html',
            options: {
              inline: true,
              context: {
                TEST: true,
                UNIT_TEST: true,
                INTEGRATION_TEST: false
              }
            }
          },
          integration_test: {
            src: '<%= yeoman.app %>/index.html',
            dest: '<%= yeoman.app %>/index.processed.html',
            inline: true,
            options: {
              context: {
                TEST: true,
                UNIT_TEST: false,
                INTEGRATION_TEST: true
              }
            }
          }
        },
        replace: {
          app: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.js',
                ember_data: 'bower_components/ember-data/ember-data.js',
                host: '<%= grunt.config.get("host") %>',
                apiKey: '<%= grunt.config.get("apiKey") %>'
              }
            },
            files: [
              {src: '<%= yeoman.app %>/index.processed.html', dest: '.tmp/index.html'},
              {src: '<%= yeoman.app %>/scripts/store.js', dest: '<%= yeoman.app %>/scripts/store.processed.js'},
              {src: '<%= yeoman.app %>/scripts/config.js', dest: '<%= yeoman.app %>/scripts/config.processed.js'}
            ]
          },
          dist: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.prod.js',
                ember_data: 'bower_components/ember-data/ember-data.prod.js',
                host: '<%= grunt.config.get("host") %>',
                apiKey: '<%= grunt.config.get("apiKey") %>'
              }
            },
            files: [
              {src: '<%= yeoman.app %>/index.html', dest: '.tmp/index.html'},
              {src: '<%= yeoman.app %>/scripts/store.js', dest: '<%= yeoman.app %>/scripts/store.processed.js'},
              {src: '<%= yeoman.app %>/scripts/config.js', dest: '<%= yeoman.app %>/scripts/config.processed.js'}
            ]
          }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: '<%= yeoman.app %>/bower_components/',
                        dest: '<%= yeoman.app %>/styles/fonts/',
                        src: [
                            'bootstrap-sass-official/vendor/assets/fonts/bootstrap/**'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates',
                'compass:server'
            ],
            test: [
                'emberTemplates',
                'compass:server'
            ],
            dist: [
                'emberTemplates',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    var templatePath = yeomanConfig.app + '/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            dist: {
                files: {
                    '.tmp/scripts/compiled-templates.js': '<%= yeoman.app %>/templates/**/*.hbs'
                }
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    }
                },
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '.tmp/scripts/combined-scripts.js'
            },
            test: {

            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'config:dev',
            'preprocess:default',
            'replace:app',
            'concurrent:server',
            'neuter:app',
            'copy:fonts',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'replace:app',
        'concurrent:test',
        'connect:test',
        'neuter:app',
        'open',
        'watch'
    ]);

    grunt.registerTask('unit_test', [
        'clean:server',
        'config:test:unit_test',
        'preprocess:unit_test',
        'concat:unit_tests',
        'test'
    ]);

    grunt.registerTask('int_test', [
        'clean:server',
        'config:test:integration_test',
        'preprocess:integration_test',
        'concat:integration_tests',
        'test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'config:prod',
        'preprocess',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
    grunt.loadNpmTasks('grunt-preprocess');
};
