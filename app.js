'use strict';
// http://api.openweathermap.org/data/2.5/forecast/daily?q=Gdansk&cnt=2&appid=63e6a26d3cc0973cfbb7064f13c6e92a
var weatherApp = angular.module('weatherApp', [
  "ngRoute",
  "ngResource"
]);

//config
weatherApp.config(["$routeProvider", function ($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController'
    })
    .when('/forecast', {
      templateUrl: '/views/forecast.html',
      controller: 'forecastController'
    })
}]);

//service
weatherApp.service('cityService', function(){
  this.city = 'Gdansk';
});

//controllers
weatherApp.controller('homeController', ['$scope', 'cityService',
  function($scope, cityService){
    $scope.city = cityService.city;

    $scope.$watch('city', function(){
      cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService',
  function($scope, $resource, cityService){
    var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
    $scope.weatherResult = weatherApi.get({
      q: 'Gdansk',
      cnt: 2,
      appid: '63e6a26d3cc0973cfbb7064f13c6e92a'
    }, function (res){
      console.log(res);
      return res;
    });
    //function(res, err){
    //   if(err){
    //
    //     return;
    //   }else{
    //     return res;
    //   }
    // }
    // $promise.then(function(data){
    //  console.log(data);
    //  return(data);
    // }).catch(function(err){
    //  console.log(err);
//});
    $scope.city = cityService.city;
    $scope.convertToCelsius = function (val){
       return (val-273.15).toFixed(1);
    };
    $scope.displayDate = function (val){
      var date =  new Date(val*1000);
      //return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
      return date;
    }

}]);
