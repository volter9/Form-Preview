module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			src: ['form-preview.js']
		},
		uglify: {
			options: {
				banner: '/**\n'
					  + ' * <%=pkg.description%>\n'
					  + ' * \n'
					  + ' * @author <%=pkg.author%>\n'
					  + ' * @copyright <%=pkg.author%> (c) 2014 \n'
					  + ' */\n'
			},
			build: {
				src:  'form-preview.js',
				dest: 'form-preview.min.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.registerTask('default', ['jshint', 'uglify']);
};