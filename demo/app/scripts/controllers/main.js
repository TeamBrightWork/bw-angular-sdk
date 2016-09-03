'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('photos')
  .controller('MainCtrl', ['$scope', '$bw', '$q', '$http', function ($scope, $bw, $q, $http) {
    $scope.name = '';

    $bw.models.album.find().then(function(albums){
      $scope.albums = albums;
      $scope.$apply();
    });

    $scope.add = function() {
      $bw.models.album.create({name: $scope.name}).then(function(newAlbum){
        $scope.name = '';
        $scope.albums.push(newAlbum);
        $scope.$apply();
      });
    }

    $scope.delete = function(album) {
      $bw.models.album.delete(album.id).then(function(){
        $scope.albums.splice($scope.albums.indexOf(album), 1);
        $scope.$apply();
      });
    }

    $scope.search = function() {
      console.log('$bw...', $bw);
      var query = $bw.query().startsWith('name', $scope.searchText);
      $bw.models.album.find(query).then(function(results){
        $scope.results = results;
        $scope.$apply();
      });
    }

  }]);
