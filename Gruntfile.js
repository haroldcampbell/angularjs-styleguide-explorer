module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build'],
            tmp: ['tmp'],
            sass: ['.sass-cache']
        },

        concat: {
//            options: {
//                separator: ';'
//            },
            js: {
                options: {
                    separator: ';'
                },
                src: ['assets/js/**/*.js'],
                dest: 'tmp/<%= pkg.name %>.js'
            },
            css: {
                src: ['assets/css/**/*.css'],
                dest: 'tmp/<%= pkg.name %>.css'
            }
        },

        copy: {
            /**
             * Copies all the non-js files to the build folder
             */
            nonjssite: {
                files: [
                    {expand: true, src: 'tmp/<%= pkg.name %>.css', dest: 'build/css/', flatten: true},
                    {expand: true, src: 'index.html', dest: 'build/'}
                ]
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'assets/js/**/*.js', 'test/**/*.js', '!test/jasmine-jquery.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
//            tasks: ['jshint', 'qunit']
            tasks: ['jshint']
        },

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: false,
                createTag: false,
                push: false
            }
        },

        /**
         * Replace version number in the index.html file with the one in the package.json
         */
        replace: {
            version: {
                src: ['index.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: /<div class="version">[0-9]\.[0-9]\.[0-9](-[0-9])?<\/div>/g,
                    to: "<div class=\"version\"><%= pkg.version %></div>"
                }]
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets',
                    src: ['sass/**/*.scss'],
                    dest: 'assets/css/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('bump-ver', "Bump the version in the package.json and index.html files.", ['bump', 'replace:version']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['sass', 'clean', 'concat', 'uglify', 'replace:version', 'copy:nonjssite']);
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};

//    "grunt-contrib-compress": "^0.13.0",
//        "grunt-karma": "^0.10.1",
