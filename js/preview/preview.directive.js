//(function () {
//
//    angular.module('app').directive('tocH3Model', function () {
//        return {
//            controller: function ($scope) {
//            }
//        }
//    });
//
//    angular.module('app')
//        .directive('previewDirective', previewDirective);
//
////    PreviewDirective.$inject = ['$scope', '$routeParams', 'SectionsService'];
//
//    function previewDirective() {
//        return {
//            restrict: 'A',
//            require: '^tocH3Model',
//            scope: {
//                tocH3Model: '='
//            },
//            replace: true,
//            template: '<div>'
//                + ' <div class=" title">{{tocH3Model.title}}</div>'
//                + ' <ul>'
//                + '     <li ng-repeat="toc_h5 in tocH3Model.toc_h5">'
//                + '         <div class="style_name">Style: {{toc_h5.style_name}}</div>'
//                + '         <ul>'
//                + '             <li ng-repeat="rule in toc_h5.section.rules">'
//                + '                 <div class="note">{{rule}}</div>'
//                + '             </li>'
//                + '         </ul>'
//                + '     </li>'
//                + ' </ul>'
//                + '</div>'
//        };
//    }
//
//    angular.module('app')
//        .directive('previewSectionModel', function () {
//            return {
//                controller: function ($scope) {
//                }
//            }
//        });
//
//    angular.module('app')
//        .directive('previewSectionsDirective', previewSectionsDirective);
//
//    function previewSectionsDirective() {
//        return {
//            restrict: 'A',
//            require: '^previewSectionModel',
//            scope: {
//                previewSectionModel: '='
//            },
//            replace: true,
//            template: '   <div class="preview" ng-show="getPreviewSection()">'
//                + '     <h2>{{previewSectionModel.title}}</h2>'
//                + '     <p>Click on the link for details.</p>'
//                + '     <section class="preview-section" ng-repeat="toc_h3 in previewSectionModel.toc_h3">'
//                + '         <div class=" title">{{toc_h3.title}}</div>'
//                + '         <ul>'
//                + '             <li ng-repeat="toc_h5 in toc_h3.toc_h5">'
//                + '                 <div class="style_name">Style: {{toc_h5.style_name}}</div>'
//                + '                 <ul>'
//                + '                     <li ng-repeat="rule in toc_h5.section.rules">'
//                + '                          <div class="note">{{rule}}</div>'
//                + '                     </li>'
//                + '                 </ul>'
//                + '             </li>'
//                + '         </ul>'
//                + '     </section>'
//                + ' </div>'
//        };
//    }
//})();
