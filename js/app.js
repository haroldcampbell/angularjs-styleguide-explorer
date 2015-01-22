'use strict';

/* App Module */

var app = angular.module('app', [
    'ngRoute',
    'SectionsService'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            }).
            when('/details/:url', {
                templateUrl: 'partials/details.html',
                controller: 'DetailsController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
