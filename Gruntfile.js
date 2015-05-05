'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
      },

      options: {
        jshintrc: true
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      files: ['<%= jshint.dev.src %>', '.jshintrc'],
      tasks: ['test_suite']
    }
  });

  grunt.registerTask('linter', ['jshint:dev']);
  grunt.registerTask('tester', ['simplemocha:dev']);
  grunt.registerTask('test_suite', ['linter', 'tester']);
};
