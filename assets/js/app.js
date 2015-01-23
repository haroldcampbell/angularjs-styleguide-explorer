(function(){
'use strict';

/* App Module */

angular.module('app', [
    'ngRoute',
    'SectionsService'
]);

angular.module('app')
    .config(['$routeProvider',
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

})();
