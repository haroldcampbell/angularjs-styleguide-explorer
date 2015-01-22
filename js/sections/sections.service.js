(function () {
    'use strict';

    angular
        .module('SectionsService', [])
        .factory('SectionsService', SectionsService);

    SectionsService.$inject = ['$http', '$q', '$log']

    function SectionsService($http, $q, $log) {
        var _this = this;
        _this.keySections = null;
        _this.previewSection = null;
        _this.sections = null;

        return {
            getSections: getSections,
            getSectionByUrl: getSectionByUrl,

            getPreviewSection: getPreviewSection,
            setPreviewSection: setPreviewSection,

            extendScopeForPreview: extendScopeForPreview
        };

        /**
         * Adds boilerplate code to the specified scope so that we can get notified
         * when the user has changed the preview section
         * @param controller_scope
         */
        function extendScopeForPreview(controller_scope) {
            controller_scope.getPreviewSection = function() {
                controller_scope.previewSection = getPreviewSection();

                return controller_scope.previewSection;
            }
        }
        /**
         * Returns an array containing a title/url hash.
         * @returns {string[]}
         */
        function getSections() {

            return $http.get('style-guide/output.json')
                .then(function (response) {
                    if (!!_this.sections) {
                        return _this.sections;
                    }

                    _this.keySections = {};
                    _this.sections = response.data;

                    for (var index = 0; index < _this.sections.length; index++) {
                        var content = response.data[index]
                        _this.keySections[content.url] = content;
                    }

                    return _this.sections
                })
                .catch(function (error) {
                    $log.debug('XHR failed for style-guide data.' + error.data)
                });
        }

        function getSectionByUrl(url) {
            var deferred = $q.defer();

            if (!!_this.sections) {
                deferred.resolve(_this.keySections[url]);
            }
            else {
                getSections()
                    .then(function (sections) {
                        deferred.resolve(_this.keySections[url]);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }

        function getPreviewSection() {
            return _this.previewSection;
        }

        function setPreviewSection(section) {
            _this.previewSection = section;
        }
    }
})();
