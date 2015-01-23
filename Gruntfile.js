module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglified_name: 'js/<%= pkg.name %>.min.js',
        css_assets: [
            "<link rel=\"stylesheet\" href=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css\">",
            "<link rel=\"stylesheet\" href=\"css/<%= pkg.name %>.css\">"
        ],

        js_assets: [
            "<script src=\"https://code.jquery.com/jquery-2.1.3.min.js\"></script>",
            "<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js\"></script>",
            "<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min.js\"></script>",
            "<script src=\"<%= uglified_name %>\"></script>"
        ],

        clean: {
            build: ['build'],
            tmp: ['tmp'],
            sass: ['.sass-cache']
        },

        concat: {
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
                    {expand: true, src: 'index.html', dest: 'build/'},
                    {expand: true, src: 'style-guide/output.json', dest: 'build/'}
                ]
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/<%= uglified_name %>': ['<%= concat.js.dest %>']
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

        replace: {
            /** Replace version number in the index.html file with the one in the package.json */
            version: {
                src: ['index.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [
                    {
                        from: /<div class="version">[0-9]\.[0-9]\.[0-9](-[0-9])?<\/div>/g,
                        to: "<div class=\"version\"><%= pkg.version %></div>"
                    }
                ]
            },
            /** Replaces the css files in the index.html file with the merged one and the bootstrap cdn */
            styles: {
                src: ['build/index.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [
                    {
                        from: /<!--\[\[css-->[\S\s<>\.="]*<!--css]]-->/g,
                        to: "<%= css_assets.join(\"\\n\\t\") %>"
                    }
                ]
            },
            /** Replaces the js files in the index.html file with the min'd files and the different js cdns */
            js: {
                src: ['build/index.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [
                    {
                        from: /<!--\[\[js-->[\S\s<>\.="]*<!--js]]-->/g,
                        to: "<%= js_assets.join(\"\\n\\t\") %>"
                    }
                ]
            }
        },

        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets',
                        src: ['sass/**/*.scss'],
                        dest: 'assets/css/',
                        ext: '.css'
                    }
                ]
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
    grunt.registerTask('replace_assets', ['replace:styles', 'replace:js']);

    grunt.registerTask('build', ['sass', 'clean', 'concat', 'uglify', 'replace:version', 'copy:nonjssite', 'replace_assets']);
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};

//    "grunt-contrib-compress": "^0.13.0",
//        "grunt-karma": "^0.10.1",
