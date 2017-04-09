module.exports = function(grunt){
	var gc = {
		imageNotyfy: __dirname+'\\notify.png',
		minifyHtml: true
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				},
				options : {
					compress: true,
					ieCompat: false
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox 16.0', 'Opera 12.1', "Chrome 26.0"],
				cascade: false
			},
			css: {
				expand: true,
				flatten: true,
				src: [
					'test/css/main.css'
				],
				dest: 'assets/template/ioweb/css/'
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true
			},
			main: {
				files: {
					'assets/template/ioweb/js/main.js': [
						'src/js/main.js'
					]
				}
			}
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 5,
					//progressive: true,
					//interlaced: true,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{png,jpg,gif,svg}'
						],
						dest: 'assets/template/ioweb/images/',
						filter: 'isFile'
					}
				]
			},
			css: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/css/*.{png,jpg,gif,svg}'
						],
						dest: 'src/images/bin/',
						filter: 'isFile'
					}
				]
			}
		},
		jade: {
			avon: {
				options: {
					pretty: !gc.minifyHtml,
					data: {
						debug: false
					}
				},
				files: {
					"index.html": [
						"src/html/index.jade"
					]
				}
			},
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: [
					'src/html/**/*.jade',
				],
				tasks: ["jade:avon","notify:done"]
			},
			js: {
				files: [
					'src/js/**/*.js'
				],
				tasks: ['notify:watch', 'uglify','notify:done']
			},
			css: {
				files: [
					'src/less/**/*.{css,less}',
				],
				tasks: ['notify:watch', 'less', 'autoprefixer','notify:done']
			},
			images: {
				files: [
					'src/images/*.{png,jpg,gif,svg}',
					'src/images/css/*.{png,jpg,gif,svg}'
				],
				tasks: ['notify:watch', 'imagemin', 'less', 'autoprefixer','notify:done']
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: '<%= globalConfig.imageNotyfy %>'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: '<%= globalConfig.imageNotyfy %>'
				}
			}
		}
	});
	grunt.registerTask('default', 	['notify:watch','imagemin', 'less', 'autoprefixer', 'uglify','jade','notify:done']);
	grunt.registerTask('dev', 		['watch']);
}