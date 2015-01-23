app.directive("adminSider", ['$rootScope', 'store',
    function ($rootScope, store) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/tpl/sider.html',
            link: function ($scope, $elem, $attrs) {
                var menus = store.get('menus');
                if (typeof menus != 'undefined' && menus != null) {
                    $rootScope.menus = menus;
                }
            }
        };
    }]);