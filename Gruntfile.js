module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			no_dest_multiple: {
				src: 'styles/stylesheets/*.css'
			},
		},
		compass: {
			watch: {
				options: {
					basePath: 'styles/',
					// bundleExec: true,
					config: 'styles/config.rb',
					specify: ['styles/sass/{,**/}*.scss']
				}
			},
			// All files – build by running `grunt compass:build`
			build: {
				options: {
					basePath: 'styles/',
					// bundleExec: true,
					config: 'styles/config.prod.rb'
				}
			},
			// Clean – remove all generated files and sass cache
			clean: {
				options: {
					basePath: 'styles/',
					// bundleExec: true,
					config: 'styles/config.rb',
					clean: true
				}
			}
		},
		watch: {
			compass: {
				files: ['<%= compass.watch.options.specify %>'], // use the same files specified in compass watch
				tasks: ['compass:watch']
			},
			autoprefixer: {
				files: ['styles/stylesheets/*.css'],
				tasks: ['autoprefixer']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'*.html',
					'styles/stylesheets/*.css',
					'images/*.{png,svg,gif,jpg}'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-exorcise');
	// grunt.loadNpmTasks('grunt-grunticon');
	// grunt.loadNpmTasks('grunt-svgmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	// grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['watch', 'autoprefixer']);
	//grunt.registerTask('default', ['browserSync', 'watch']);
	// grunt.registerTask('icons', ['svgmin', 'grunticon','clean:grunticonJunk']);
	// grunt.registerTask('prefix', ['autoprefixer']);
	// grunt.registerTask('browserifyMain', ['browserify:main', 'exorcise:main', 'uglify:main']);

	grunt.registerTask('cleanAll', ['compass:clean']);
	grunt.registerTask('build', ['compass:build', 'autoprefixer']);

	// grunt.registerTask('test', ['uglify:plugins', 'browserifyMain', 'browserify:specs', 'jasmine']);
};
