var app = angular.module('myApp');

app.controller('LoginController', ['$rootScope', '$scope', '$location', 'store', 'LoginService',
    function ($rootScope, $scope, $location, store, LoginService) {

        var currentUrl = $location.url();
        if ('/login' === currentUrl) {
            /*
             * We need check user's status every times when we enter '/login', it's unnecessary
             * to login again if we have already loged in.
             */
            var token = store.get('token');
            // if already login.
            if (typeof token !== 'undefined' && token != null) {
                // skip login then go '/me' directly.
                $location.path('/me');
            } else {
                // init menus in sider.
                $rootScope.isRetriveMenus = false;
                $rootScope.menus = [
                    {
                        "name": "登陆",
                        "url": "/login"
                    },
                    {
                        "name": "注册",
                        "url": "/regist"
                    }
                ];
            }
        }

        $scope.login = function () {
            var rememberMe = $scope.rememberMe,
                formData = {
                    username: $scope.username,
                    password: $scope.password
                };

            LoginService
                .login(formData)
                .success(function (res) {
                    console.log(JSON.stringify(res));

                    if (res.success) {
                        // save the successful user when logged successfully.
                        store.set('token', res.token);
                        // redirect to /me.
                        $location.path('/me');
                    }
                })
                .error(function () {});
        };

        $scope.regist = function () {
            var formData = {
                username: $scope.username,
                password: $scope.password
            };

            LoginService
                .regist(formData)
                .success(function (res) {
                    if (res.success === false) {
                        console.error(JSON.stringify(res));
                    } else {
                        store.set('token', res.token);
                        $location.path('/me');
                    }
                })
                .error(function () {});
        };

        $scope.logout = function () {
            store.remove('token');
            $location.path('/login');
        };

    }]);

app.controller('MainController', ['$rootScope', '$scope', '$location', 'store', 'MenuService',
    function ($rootScope, $scope, $location, store, menuService) {

        var currentUrl = $location.url();
        console.log('url: ' + $location.url());

        var token = store.get('token');

        if ('/me' === currentUrl && token) {
            // update menus
            menuService
                .myMenus()
                .success(function (res) {
                    if (res.success) {
                        var menus = res.menus;
                        menus.push({
                            "isDivider": true
                        });
                        menus.push({
                            "name": "注销",
                            "url": "/logout"
                        });

                        $rootScope.menus = menus;
                        $rootScope.isRetriveMenus = true;
                        store.set('menus', $rootScope.menus);
                    }
                });
        }

        if ('/' === currentUrl) {
            // if a token exists in localstorage. go /me.
            var shouldVisitPath = token ? '/me' : '/login';
            $location.path(shouldVisitPath);
        }

    }]);

app.controller('ProductController', ['$scope',
    function ($scope) {
        $scope.users = [
            {
                "id": "1",
                "username": "lucentx",
                "first_name": "Aron",
                "last_name": "Barbosa",
                "address": "Manila, Philippines"
            },
            {
                "id": "2",
                "username": "ozzy",
                "first_name": "Ozzy",
                "last_name": "Osbourne",
                "address": "England"
            },
            {
                "id": "3",
                "username": "tony",
                "first_name": "Tony",
                "last_name": "Iommi",
                "address": "England"
            }
        ];
    }]);