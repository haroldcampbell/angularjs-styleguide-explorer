(function() {
    'use strict';

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'SectionsService'];

    function HomeController($scope, sectionsService) {

        /* meta-code that defines $scope.previewSection, and $scope.getPreviewSection() */
        sectionsService.extendScopeForPreview($scope);

    }
})();
