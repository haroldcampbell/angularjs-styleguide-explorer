(function() {

    angular.module('app')
    .controller('SectionsController', SectionsController);

    SectionsController.$inject = ['$scope', 'SectionsService'];

    function SectionsController($scope, sectionsService) {
        /* Use a view-model so that we can use ControllerAs */
        var vm = this;
        vm.sections = [];
        $scope.vm = vm;

        vm.activate = activate;
        vm.activate();

        $scope.setPreviewSection = function (section) {
            console.log("secs: setPreviewSection")
            sectionsService.setPreviewSection(section);
        };

        $scope.clearPreviewSection = function() {
            console.log("secs: clearPreviewSection")
            sectionsService.setPreviewSection(null);
        };

        function activate() {
            return sectionsService.getSections().then(function(sections){
                vm.sections = sections;
            });
        }
    }
})();

