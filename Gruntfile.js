'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*', 'assets/**', 'views/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      },
      htmldir: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*', 'views/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      },
      assetsdir: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['assets/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    },

    clean: {
      build: {
        src: [ 'build' ]
      }
    },

    sass: {
      dist: {
        files: {
          'app/css/style.css' : 'app/sass/*.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },

    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['app/index.html']
      }
    },

    connect: {
      server: {
        options: {
          port: 6001,
          base: './build'
        }
      }
    },

    watch: {
      
      html: {
        files: ['app/index.html', 'app/views/*.html'],
        tasks: ['copy:htmldir'],
        options: {
          livereload: true
        }
      },

      css: {
        files: ['app/sass/**/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },

      assets: {
        files: ['app/assets/**'],
        tasks: ['copy:assetsdir'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['build', 'css', 'html', 'connect:server', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:main']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('html', ['htmlhint']);
};