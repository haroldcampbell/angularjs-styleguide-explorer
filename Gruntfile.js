module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//        concat: {
//            options: {
//                separator: ';'
//            },
//            dist: {
//                src: ['src/**/*.js'],
//                dest: 'dist/<%= pkg.name %>.js'
//            }
//        },
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
//            },
//            dist: {
//                files: {
//                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
//                }
//            }
//        },
//        qunit: {
//            files: ['test/**/*.html']
//        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', '!test/jasmine-jquery.js'],
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
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint']);
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};

//    "grunt-contrib-compress": "^0.13.0",
//    "grunt-contrib-uglify": "^0.7.0",
//        "grunt-karma": "^0.10.1",