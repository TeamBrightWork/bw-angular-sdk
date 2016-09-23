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
        copy: {
            docs: {
                src: 'README.md',
                dest: 'docs/GettingStarted.md'
            },
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-jsdoc');
    //grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("docs", ["copy:docs"]);
    grunt.registerTask("build", ["browserify", "docs"]);
};