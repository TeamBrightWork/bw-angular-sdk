angular.module('brightwork', []);

angular.module('brightwork').provider('$bw', function () {

    console.log('loading brightwork SDK...');

    var $apiKey,
        $appName;

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

    var bwAngularSDK = function bwAngularSDK($q) {
        this._sdk = null;
        this.$q = $q;
    };

    bwAngularSDK.prototype = {
        init() {
            var _self = this;
            if (!this._sdk) {
                return BrightWork.initialize($apiKey, $appName).then(function(sdk){
                    _self._sdk = sdk;
                    return _self;
                });
            } else {
                return this.$q.fcall(function () {
                    return _self;
                });
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