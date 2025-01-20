var app = angular.module('MyModule', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/devices', {
            templateUrl: 'Components/DataTableFragment.html',
            controller: 'DeviceController'  
        })
        .otherwise({
            redirectTo: '/devices'
        });
}]);