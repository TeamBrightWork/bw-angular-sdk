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
> See {@link BrightWork}

## Examples
Let's assume we are working off the default BW generated manifest for a photo album.  This manifest contains two models, album & photo.

### Create a new album
```
    bw.models.album.create({ name: "My Photo Album"}).then(function(newAlbum) {
        console.log('A new album was created.');
        console.log(newAlbum);
    });
```
> See {@link Repository#create}

### Get an album from the server
```
    bw.models.album.get(1).then(function(existingAlbum) {
        console.log('Album with id: 1 is...');
        console.log(newAlbum);
    });
```
> See {@link Repository#get}

### Update an existing album
*Assumes that you have have fetched an existing ablum using get and saved to existingAlbum variable.*
```    
    bw.models.album.save(existingAlbum).then(function(savedAlbum) {
        console.log('Album saved...');
        console.log(savedAlbum);
    });
```
> See {@link Repository#save}

### Delete an existing album
```
    bw.models.album.delete(1).then(function() {
        console.log('Album 1 has been deleted');
    });
```
> See {@link Repository#delete}

### Search for an album
```
    var query = BrightWork.Query().equalTo('name', 'My Photo Album');
        
    console.log('searching for all albums named "My Photo Album"...');
    bw.models.album.find(query).then(function(albums) {
        console.log('...results', albums);
    });
```
> See <br/>
{@link Repository#find} <br/>
{@link Query}

### Advanced Query
For this example let's assume you have an e-commerce system with Order and LineItem models. You need to find all line items where the amount is 
above $50 and the item is in a "pending" or "paid" status.  You want the results sorted first in decending order by date and then sorted in ascending order by line number. 
```
    var query = BrightWork.Query()
        .greaterThan('amount', 50)
        .oneOf('status', ['pending', 'paid'])
        .descending('order_date')
        .ascending('line_number');
               
    bw.models.lineitem.find(query).then(function(items) {
        console.log('items found...', items);
    });

```
> See <br/> 
{@link Repository#find} <br/>
{@link Query}
