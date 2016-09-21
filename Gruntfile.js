module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                src: ["./index.js"],
                dest: "dist/index.js",
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]}
            }
        },
        watch: {
            scripts: {
                files: ["./*.js"],
                tasks: ["browserify"]
            }
        },
        jsdoc : {
            dist : {
                src: ['*.js', 'README.md'],
                options: {
                    destination : 'docs',
                    configure: './.jsdoc.json',
                    template: './template'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-jsdoc');
    //grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["browserify"]);
};