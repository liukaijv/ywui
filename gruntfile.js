/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            basePath: './',
            sassPath: 'src/sass/',
            cssPath: 'css/'
        },

        // Task configuration.
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    '<%= meta.cssPath %>main.min.css': '<%= meta.sassPath %>main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= meta.sassPath %>/*.scss'
                ],
                tasks: ['sass']
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'html.zip'
                },
                files: [
                    {src: ['dist/**'], dest: '', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            target: {
                files: {
                    'js/main.min.js': [
                        'src/js/main.js'
                    ]
                }
            }
        },
        copy: {
            product: {
                files: [
                    {
                        expand: true,
                        src: ['css/**', 'js/**', 'images/**', '*.html'],
                        dest: 'dist',
                        filter: 'isFile'
                    }
                ]
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task.
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('build', ['sass', 'uglify', 'copy', 'compress']);

};