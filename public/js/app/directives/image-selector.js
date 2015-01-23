app.directive("imageSelector", [

    function () {

        /*
         * <image-selector data-hint='Choose a picture.' data-name='pic'></image-selector>
         *
         *
         */
        var linkFn = function ($scope, $elem, $attrs) {
            $scope.hint = $attrs.hint;
            $scope.name = $attrs.name;
            var id = $scope.id = 'image-select-' + Date.now();
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: '/tpl/image-selector.html',
            link: linkFn
        };
    }

]);