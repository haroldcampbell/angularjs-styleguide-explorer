(function() {
    'use strict';

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
            console.log('setPreviewSection');
            sectionsService.setPreviewSection(section);
        };

        $scope.clearPreviewSection = function() {
            sectionsService.setPreviewSection(null);
        };

        function activate() {
            return sectionsService.getSections().then(function(sections){
                vm.sections = sections;
            });
        }
    }
})();

