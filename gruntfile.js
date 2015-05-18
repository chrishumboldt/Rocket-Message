module.exports = function(grunt) {
	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['watch']);

	// Other tasks
	grunt.registerTask('build', ['sass', 'uglify']);

	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: {
					'css/messageplate.css': 'sass/messageplate.scss',
					'css/demo.css': 'sass/demo.scss'
				}
			}
		},
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/messageplate.min.js': ['js/messageplate.js']
				}
			}
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			// HTML
			html: {
				files: ['*.html']
			},
			// Scripts
			scripts: {
				files: 'js/*.js',
				tasks: ['uglify']
			},
			// Live reload
			options: {
				livereload: true
			}
		}
	});
}