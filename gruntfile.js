module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			options: {
				sourceMap: false,
				presets: ['es2015']
			},
			dist: {
				files: [{
					expand:true,
					cwd: 'src/js/scripts',
					src: ['*.js'],
					dest: 'src/js',
					ext: '.js',
					extDot: 'first'
				}]
			}
		},
		concat: {
			dist: {
				src: ['src/js/tmpl.js', 'src/js/modal.js', 'src/js/script.js'],
				dest: 'dist/js/script.main.js'
			}
		},
		concat_css: {
			dist: {
				src: ['src/css/*.css'],
				dest: 'dist/css/style.main.css'
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['index.html'],
					dest: 'dist',
				}],
			}			
		},
		watch: {
			babel: {
				files: 'js/src/*.js',
				tasks: ['babel']
			},
			sass: {
			  files: ['src/css/*.scss'],
			  tasks: ['sass', 'concat_css']
			},
			concat: {
				files: ['src/js/*.js'],
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['babel', 'concat', 'concat_css', 'copy']);
};
