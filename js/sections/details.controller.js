(function () {
    'use strict';

    angular.module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$scope', '$routeParams', 'SectionsService'];

    function DetailsController($scope, $routeParams, sectionsService) {
        $scope.section = null;
        $scope.activate = activate;
        $scope.activate($routeParams.url);

        /**
         * Ensures that the selected section is not changed to a preview when the mouse is over that section
         * in the nav menu
         * @returns {*}
         */
        $scope.getDetailPreviewSection = function () {
            $scope.getPreviewSection();

            if (!!$scope.previewSection && ($scope.previewSection.url == $routeParams.url)) {
                return false;
            }
            return $scope.previewSection;
        };

        function activate(url) {
            /* meta-code that defines $scope.previewSection, and $scope.getPreviewSection() */
            sectionsService.extendScopeForPreview($scope);
            $scope.getPreviewSection();

            sectionsService.getSectionByUrl(url)
                .then(function (section) {
                    $scope.section = section;
                }).catch(function (error) {
                    $log.debug('DetailsController XHR failed for style-guide data.' + error.data)
                });
        }
    }
})();
