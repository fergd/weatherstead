module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			no_dest_multiple: {
				src: 'public/stylesheets/ress/css/*.css'
			},
		},
		browserify: {
			main: {
				src: ['public/scripts/coffee/{,**/}*.coffee', '!public/scripts/coffee/examples/{,**/}*.coffee'],
				dest: 'public/scripts/js/main_r.js',
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: ['coffeeify']

				}
			},
			specs: {
				src: 'public/scripts/specs/global/*.spec.coffee',
				dest: 'public/scripts/specs/allSpecs.js',
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: ['coffeeify']

				}
			}
		},
		compass: {
			// the watch process – everything but IE-fallback
			watch: {
				options: {
					basePath: 'public/stylesheets/ress',
					bundleExec: true,
					config: 'public/stylesheets/ress/config.rb',
					specify: ['public/stylesheets/ress/sass/{,**/}*.scss', '!public/stylesheets/ress/sass/master-ie.scss']
				}
			},
			// All files – build by running `grunt compass:build`
			build: {
				options: {
					basePath: 'public/stylesheets/ress',
					bundleExec: true,
					config: 'public/stylesheets/ress/config.prod.rb'
				}
			},
			// Clean – remove all generated files and sass cache
			clean: {
				options: {
					basePath: 'public/stylesheets/ress',
					bundleExec: true,
					config: 'public/stylesheets/ress/config.rb',
					clean: true
				}
			}
		},
		clean: {
			grunticonJunk: [
				'public/images/ress/<%= grunticon.dist.options.previewhtml %>',
				'public/images/ress/<%= grunticon.dist.options.loadersnippet %>'
			],
			allIconStuff: [
				'<%= clean.grunticonJunk %>',
				'public/images/ress/png',
				'public/images/ress/svg/optimized',
				'public/stylesheets/ress/css/vendors/icons.**.css'
			],
			javascript: [
				// Coffee-generated
				'public/scripts/js/',
				// uglify-generated
				'public/scripts/vendors/plugins.min.js'
			]
		},
		exorcise: {
			main: {
				files: {
					'public/scripts/js/main_r.map': ['public/scripts/js/main_r.js']
				}
			}
		},
		grunticon: {
			dist: {
				files: [{
					expand: true,
					cwd: 'public/images/ress/svg/optimized',
					src: ['*.svg', '*.png'],
					dest: "public/images/ress"
				}],
				options: {
					datasvgcss: "../../stylesheets/ress/sass/vendors/icons.data.svg.scss",
					datapngcss: "../../stylesheets/ress/sass/vendors/icons.data.png.scss",
					urlpngcss: "../../stylesheets/ress/sass/vendors/icons.fallback.scss",

					previewhtml: "preview.html",

					// grunticon loader code snippet filename
					loadersnippet: "grunticon.loader.js",

					// folder name (within dest) for png output
					pngfolder: "../../images/ress/png",

					// relative path to fallback PNGs for the generated CSS file
					pngpath: "../../../images/ress/png",

					// additional CSS to create
					customselectors: {
						"*": [".icon-$1::before"]
					},

					// define which color variables are used
					colors: {
						apple: "#CE3C3C",
						beet: "#A82E2F",
						bokchoy: "#799A52",
						blueberry: "#5D777D",
						sorbet: "#94B0C4",
						grey: "#868D91",
						ltgreen: "#C6DC84",
						lemon: "#FCDD78",
						kale: "#5B784D",
						slab: "#F2F2F2",
						silver: "#C2C7CB"
					},

					// Template - to control output CSS
					template: "public/stylesheets/ress/css/vendors/grunticon-template.hbs"
				}
			}
		},
		jasmine: {
			test: {
				src: 'public/scripts/js/main_r.js',
				options: {
					specs: 'public/scripts/specs/allSpecs.js',
					vendor: [
						'public/scripts/vendors/modernizr-2.6.2-respond-1.1.0.min.js',
						'public/scripts/vendors/jquery-1.11.0.min.js'
					],
					helpers: [
						'public/scripts/vendors/plugins.min.js'
					],
					styles: [
						'public/stylesheets/ress/vendors/icons.data.svg.css',
						'public/stylesheets/ress/master.css'
					],
					// outfile: '/tmp/' + someUniqueBuildID + '_SpecRunner.html'  // ideally we would save this to a unique tmp dir to eliminate issues when tests are run simultaneously
					outfile: 'public/scripts/specs/_SpecRunner.html'
				}
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'public/images/ress/svg',
					src: ['*.svg'],
					dest: 'public/images/ress/svg/optimized'
				}]
			}
		},
		uglify: {
			plugins: {
				options: {
					mangle: false,
					sourceMap: true,
					sourceMapName: 'public/scripts/vendors/plugins.sourcemap.map'
				},
				files: {
					'public/scripts/vendors/plugins.min.js': [
						'public/scripts/vendors/plugins/fastclick.js',
						// 'public/scripts/vendors/plugins/hammer.js',												// Temporarily disabled, not currently in use
						// 'public/scripts/vendors/plugins/jquery.bpopup.js',										// Not using this one anymore?
						'public/scripts/vendors/plugins/jquery.payment.js',											// Used for formatting CC fields
						'public/scripts/vendors/plugins/jquery.owl-carousel.js',
						'public/scripts/vendors/plugins/jquery.velocity.js',
						'public/scripts/vendors/plugins/jquery.validate.js',
						'public/scripts/vendors/plugins/waypoints.js',
						'public/scripts/vendors/plugins/packery.pkgd.js',											// Masonry-like JS layout library
						'public/scripts/vendors/plugins/imagesloaded.pkgd.js',										// Emits events when all images are loaded for a specific DOM element, used by masonry
						'public/scripts/vendors/plugins/waypoints-sticky.js',
						'public/scripts/vendors/plugins/headroom.js',												// On demand header
						'public/scripts/vendors/plugins/additional-methods.js', 									// part of jquery.validate
						'public/scripts/vendors/plugins/moment.min.js',												// required for daterangepicker
						'public/scripts/vendors/plugins/jquery.daterangepicker-EDITED-DONT-UPGRADE-V2.js', 			// previous hacked file located in scripts/vendors/plugins/unused
						// 'public/scripts/vendors/plugins/jquery.matchHeight.js'	// For equal height columns/elements – https://github.com/liabru/jquery-match-height
						'public/scripts/vendors/plugins/jquery.autocomplete.js',
						'public/scripts/vendors/plugins/jquery-migrate-1.2.1.js',									// required to prevent errors with hashchange lib below
						'public/scripts/vendors/plugins/jquery.ba-hashchange-1.3.js',								// handle changes to URL #hashes, depends on above 'migrate' to not cause errors in jQuery > 1.9
						'public/scripts/vendors/plugins/jquery.caret.js',					        // required for mobilePhoneNumber plugin
						'public/scripts/vendors/plugins/jquery.mobilePhoneNumber-hackedByDave.js'	// phone number validation, with additional hack to limit typeable phone numbers to 10 digits
					]
				}
			},
			main: {
				options: {
					mangle: false,
					sourceMap: true,
					sourceMapIn: 'public/scripts/js/main_r.map',
					sourceMapIncludeSources: true,
					sourceMapName: 'public/scripts/js/main_r.map'
				},
				files: {
					'public/scripts/js/main_r.min.js': 'public/scripts/js/main_r.js'
				}
			}
		},
		watch: {
			coffee: {
				files: ['<%= browserify.main.src %>'],
				tasks: ['browserifyMain']
			},
			compass: {
				files: ['<%= compass.watch.options.specify %>'], // use the same files specified in compass watch
				tasks: ['compass:watch']
			},
			// autoprefixer: {
			// 	files: ['public/stylesheets/ress/css/*.css'],
			// 	tasks: ['autoprefixer']
			// },
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'app/views/{,**/}*_r.html',
					'public/stylesheets/ress/css/*.css',
					'public/javascripts/ress/{,**/}*.js',
					'public/scripts/js/{,**/}*.js',
					'public/images/ress/{,**/}*.{png,jpg,jpeg,gif,webp,svg}',
					'public/stylelib/{,**/}*.{html,txt,php}'
				]
			}
		}
		// browserSync: {
  //           dev: {
  //               bsFiles: {
  //                   src : [
		// 				'{,**/}*_r.html',
		// 				'public/stylesheets/ress/css/*.css',
		// 				'public/javascripts/ress/{,**/}*.js',
		// 				'public/scripts/js/{,**/}*.js',
		// 				'public/images/ress/{,**/}*.{png,jpg,jpeg,gif,webp,svg}',
		// 				'public/stylelib/{,**/}*.{html,txt,php}'
  //                   ]
  //               },
  //               options: {
  //                   watchTask: true // < VERY important
  //               }
  //           }
  //       }
	});

	grunt.loadNpmTasks('grunt-browserify');
	/*
	<script type='text/javascript' id="__bs_script__">//<![CDATA[
	document.write("<script async src='//HOST:3000/browser-sync/browser-sync-client.1.8.3.js'><\/script>".replace(/HOST/g, location.hostname).replace(/PORT/g, location.port));
	//]]></script>
	*/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exorcise');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('icons', ['svgmin', 'grunticon','clean:grunticonJunk']);
	grunt.registerTask('prefix', ['autoprefixer']);
	grunt.registerTask('browserifyMain', ['browserify:main', 'exorcise:main', 'uglify:main']);

	grunt.registerTask('cleanAll', ['clean:allIconStuff', 'clean:javascript', 'compass:clean']);
	grunt.registerTask('build', ['icons', 'compass:build', 'autoprefixer', 'uglify:plugins', 'browserifyMain']);

	grunt.registerTask('test', ['uglify:plugins', 'browserifyMain', 'browserify:specs', 'jasmine']);
};
