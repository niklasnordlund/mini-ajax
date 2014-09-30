module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'js/*.js'
      ]
    },
    uglify: {
      options: {
        preserveComments: false,
        report: 'gzip'
      },
      target: {
        files: {
          'js/mini-ajax.min.js': ['js/mini-ajax.js']
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);
};
