app.controller('LogoutController', ['$rootScope', '$scope', '$location', 'store',
    function ($rootScope, $scope, $location, store, LoginService) {

        $scope.logout = function () {
            store.remove('token');
            store.remove('menus');
            delete $rootScope.menus;
            $location.path('/admin/login');
        };

    }]);