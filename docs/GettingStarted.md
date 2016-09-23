# Getting Started

The BrightWork platform provides a complete backend solution for your apps.  Our goal is to increase developer productivity 
and reduce the time it takes for you to build a complete application.
 
Our AngularJS SDK accelerates the time it takes to integrate your backend API with your AngularJS application.

## Adding the SDK to your app

### Bower
```
    bower install --save bw-angular-sdk
```

## Connecting to your API

### Add the script tags
Make sure you have both the BrightWork JS & AngularJS SDK tags in your index page.
```html
<script src="bower_components/bw-js-sdk/dist/index.js"></script>
<script src="bower_components/bw-andular-sdk/dist/index.js"></script>
```

### Configure the SDK
First add the 'brightwork' module to your dependencies. Then add a config section to your angular app.

```javascript
.config(['$bwProvider', function($bw){
    $bw.apiKey('YOUR_API_KEY');
    $bw.appName('YOUR_APP_NAME');
}])
```

### Initialize the SDK on your "Home" route
In order to use the SDK it will need to be initialized so that it can read your models and services from your BrightWork API.

```javascript
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          '$bw' : ['$bw', function($bw) {
              return $bw.init();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
})
```

### Full Example

Here is a full example from our demo app.

```javascript
angular
  .module('photos', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'brightwork'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          '$bw' : ['$bw', function($bw) {
              return $bw.init();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$bwProvider', function($bw){
    $bw.apiKey('YOUR_API_KEY');
    $bw.appName('YOUR_APP_NAME');
  }]);
```


All of your models and services are available now via the $bw angular service. Similar to the Javascript SDK you can now access your models ($bw.models) and services ($bw.services) by injecting the $bw service into your controller.

## Examples
Let's assume we are working off the default BW generated manifest for a photo album.  This manifest contains two models, album & photo.

### Create a new album
```
    $scope.create = function() {
        $bw.models.album.create({ name: $scope.name}).then(function(newAlbum){        
                $scope.name = '';
                $scope.albums.push(newAlbum);
                $scope.$apply();
        });
    });
    
```
*_assumes that $scope.name is bound to an input, you have a list on the screen $scope.albums that needs to be updated and that your calling create() on your controller_

### Get an album from the server
```
    $scope.lookup = function() {
        $bw.models.album.get($scope.id).then(function(existingAlbum) {
            $scope.album = existingAlbum;
            $scope.$apply();
        });
    });
```
*_assumes you have an input bound to $scope.id and are calling lookup() method of your controller_

### Update an existing album
*Assumes that you have have fetched an existing ablum using get and saved to existingAlbum variable.*
```    
    $scope.save = function() {
        $bw.models.album.save($scope.album).then(function(savedAlbum) {
            $scope.album = savedAlbum;
            $scope.$apply();
        });
    });
```
*_assumes you are editing $scope.album and calling save() method on your controller_

### Delete an existing album
```
    $scope.delete = function(album) {
      $bw.models.album.delete(album.id).then(function(){
        $scope.albums.splice($scope.albums.indexOf(album), 1);
        $scope.$apply();
      });
    }
```
*_assumes your passing an album to your controller delete() method_

### Search for an album
```    
    $scope.search = function(album) {
        var query = $bw.query().equalTo('name', 'My Photo Album');
        $bw.models.album.find(query).then(function(albums) {
            $scope.results = albums;
            $scope.$apply();
        });
    });
```
*_assumes that you have a search box bound to $scope.name, a result list bound to $scope.results and you call search() on your controller_

### Advanced Query
For this example let's assume you have an e-commerce system with Order and LineItem models. You need to find all line items where the amount is 
above $50 and the item is in a "pending" or "paid" status.  You want the results sorted first in decending order by date and then sorted in ascending order by line number. 
```
    var query = $bw.query()
        .greaterThan('amount', 50)
        .oneOf('status', ['pending', 'paid'])
        .descending('order_date')
        .ascending('line_number');
               
    $bw.models.lineitem.find(query).then(function(items) {
        console.log('items found...', items);
    });

```