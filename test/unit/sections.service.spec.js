/* global describe, it, before, beforeEach, after, afterEach */
(function () {

    "use strict";

    describe('SectionsService', function () {
        var service, httpBackend;

        beforeEach(module('SectionsService'));
        beforeEach(inject(function (SectionsService, $httpBackend, $log) {
            service = SectionsService;
            httpBackend = $httpBackend;

            jasmine.getJSONFixtures().fixturesPath = 'base/style-guide/';

            $httpBackend.whenGET('../style-guide/output.json').respond(
                getJSONFixture('output.json')
            );
        }));

        it('should be defined', function () {
            expect(service).toBeDefined();
        });

        it('should return the sections', function () {
            service.getSections()
                .then(function (sections) {
                    expect(sections.length).toEqual(30);
                });

            httpBackend.flush();
        });
    });
})();
