/* global describe, it, before, beforeEach, after, afterEach */
(function () {

    "use strict";

    describe('SectionsController', function () {
        var rootScope, scope, controller;

        beforeEach(module('app'));
        beforeEach(inject(function ($rootScope, $controller, SectionsService) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            controller = $controller('SectionsController', {
                $scope: scope,
                sectionsService: SectionsService
            });
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        describe('Get data', function () {
            var httpBackend;

            beforeEach(inject(function ($rootScope, $controller, SectionsService, $httpBackend) {
                httpBackend = $httpBackend;
                jasmine.getJSONFixtures().fixturesPath = 'base/style-guide/';

                $httpBackend.whenGET('../style-guide/output.json').respond(
                    getJSONFixture('output.json')
                );
            }));

            it('should have the sections from the SectionsService', function () {
                httpBackend.flush();
                expect(scope.vm.sections.length).toBe(30);
            });

        });

    });
})();
