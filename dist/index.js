(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                src: ["./*.js"],
                dest: "dist/index.js",
                options: {
                    noParse: ["./node_modules/bw-js-sdk/dist/index.js"]
                }
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
},{}],2:[function(require,module,exports){
angular.module('brightwork', []);

angular.module('brightwork').provider('$bw', function () {

    console.log('loading brightwork SDK...');

    var $apiKey,
        $appName,
        $apiUrl,
        $appUrl;

    this.apiKey = function (apiKey) {
        if (!apiKey) {
            return $apiKey;
        }
        $apiKey = apiKey;
    };

    this.appName = function (appName) {
        if (!appName) {
            return $appName;
        }
        $appName = appName;
    };

    this.apiUrl = function (apiUrl) {
        if (!apiUrl) {
            return $apiUrl;
        }
        $apiUrl = apiUrl;
    };

    this.appUrl = function (appUrl) {
        if (!appUrl) {
            return $appUrl;
        }
        $appUrl = appUrl;
    };

    var bwAngularSDK = function bwAngularSDK($q) {
        this._sdk = null;
        this.$q = $q;
    };

    bwAngularSDK.prototype = {
        init() {
            var _self = this;
            if (!this._sdk) {
                return BrightWork.initialize($apiKey, $appName, $apiUrl, $appUrl).then(function(sdk){
                    _self._sdk = sdk;
                    return _self;
                });
            } else {
                return this.$q.resolve(_self);
            }
        },

        get models() {
            return this._sdk.models;
        },

        query() {
            return BrightWork.query();
        }
    };

    this.$get = ['$q', function($q) {

        console.log('$get brightwork SDK...');

        return new bwAngularSDK($q);

    }];

});
},{}]},{},[1,2]);
