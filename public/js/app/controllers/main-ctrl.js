app.controller('MainController', ['$rootScope', '$scope', '$location', 'store', 'MenuService',
    function ($rootScope, $scope, $location, store, menuService) {
        
        var token = store.get('token');
        var menus = store.get('menus');

        if (!token) {
            $location.path('/admin/login');
            return;
        }

        // update menus
        if (!menus) {
            menus = [];
            menuService
                .myMenus()
                .success(function (res) {
                    if (res.success) {
                        menus = res.menus;
                        menus.push({"isDivider": true });
                    }

                    menus.push({ "name": "注销", "url": "/logout" });
                    $rootScope.menus = menus;
                    store.set('menus', $rootScope.menus);
                });
        } else {
            $rootScope.menus = menus;
        }
        
    }]);