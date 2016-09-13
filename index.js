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