(function () {
    'use strict';

    angular.module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$scope', '$routeParams', 'SectionsService'];

    function DetailsController($scope, $routeParams, sectionsService) {
        $scope.section = null;
        $scope.activate = activate;
        $scope.activate($routeParams.url);

        function activate(url) {
            sectionsService.extendScopeForPreview($scope);
            sectionsService.getSectionByUrl(url)
                .then(function (section) {
                    $scope.section = section;
                }).catch(function (error) {
                    $log.debug('DetailsController XHR failed for style-guide data.' + error.data)
                });
        }
    }
})();
