(function() {

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'SectionsService'];

    function HomeController($scope, sectionsService) {

        sectionsService.extendScope($scope);

//        $scope.previewSection = null;
//
//        $scope.getPreviewSection = function() {
//            $scope.previewSection = sectionsService.getPreviewSection();
//
//            return $scope.previewSection;
//        }
    }
})();
