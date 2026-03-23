const sass = require('sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // Limpa a pasta dist antes de cada build
        clean: ['dist/'],

        // Compila SASS para CSS
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                style: 'compressed'
            },
            dist: {
                files: {
                    'dist/src/styles/main.css': 'dev/src/styles/main.scss'
                }
            }
        },

        // Minifica HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html'
                }
            }
        },

        // Minifica JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/src/scripts/countdown.js': ['dev/src/scripts/countdown.js']
                }
            }
        },

        // Copia Imagens
        copy: {
            images: {
                expand: true,
                cwd: 'dev/src/images/',
                src: ['**'],
                dest: 'dist/src/images/'
            }
        },

        // Observa mudanças
        watch: {
            sass: {
                files: ['dev/src/styles/**/*.scss'],
                tasks: ['sass']
            },
            html: {
                files: ['dev/index.html'],
                tasks: ['htmlmin']
            },
            js: {
                files: ['dev/src/scripts/**/*.js'],
                tasks: ['uglify']
            }
        },

        // Servidor local com live reload
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/src/styles/*.css',
                        'dist/index.html',
                        'dist/src/scripts/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist',
                    open: true
                }
            }
        }
    });

    // Carrega plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Tarefas padrão
    grunt.registerTask('default', ['clean', 'sass', 'htmlmin', 'uglify', 'copy']);
    grunt.registerTask('dev', ['clean', 'sass', 'htmlmin', 'uglify', 'copy', 'browserSync', 'watch']);
};
