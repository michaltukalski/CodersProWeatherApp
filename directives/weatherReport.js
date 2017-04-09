angular.module('weatherApp').directive ('weatherReport', function(){
  return {
    restrict:'E',
    templateUrl: 'directives/weather-report.html',
    replace: true,
    scope:{
      //'<' - one way data binding
      //'=' -two way data binding
      //'&' -dla funkcji lub expression
      weatherDay:'<',
      displayDate:'&',
      convertToCelsius: '&',
      dateFormat: '<'
    }
  }
})
