(function () {
    'use strict';

    angular.module('app')
        .directive('showSectionPreview', showSectionPreview);

    function showSectionPreview() {
        return {
            restrict: 'A',
            require: '^previewSectionModel',
            scope: {
                previewSectionModel: '='
            },
            replace: true,
            template: '   <div class="preview">'
                + '     <h2>{{previewSectionModel.title}}</h2>'
                + '     <p>Click on the link for details.</p>'
                + '     <section class="preview-section" ng-repeat="toc_h3 in previewSectionModel.toc_h3">'
                + '         <div class=" title">{{toc_h3.title}}</div>'
                + '         <ul>'
                + '             <li ng-repeat="toc_h5 in toc_h3.toc_h5">'
                + '                 <div class="style_name">Style: {{toc_h5.style_name}}</div>'
                + '                 <ul>'
                + '                     <li ng-repeat="rule in toc_h5.section.rules">'
                + '                          <div class="note">{{rule}}</div>'
                + '                     </li>'
                + '                 </ul>'
                + '             </li>'
                + '         </ul>'
                + '     </section>'
                + ' </div>'
        };
    }
})();
