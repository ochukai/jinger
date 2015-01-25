app.controller('LoginController', ['$rootScope', '$scope', '$location', 'store', 'LoginService',
    function ($rootScope, $scope, $location, store, LoginService) {

        var token = store.get('token');
       
        if (typeof token !== 'undefined' && token != null) {
            $location.path('/admin/me');
        } else {
            $rootScope.menus = [
                { "name": "登陆", "url": "/login" },
                { "name": "注册", "url": "/register" }
            ];
        }

        $scope.login = function () {
            var formData = {
                username: $scope.username,
                password: $scope.password
            };

            LoginService
                .login(formData)
                .success(function (res) {
                    if (res.success) {
                        // save the successful user when logged successfully.
                        store.set('token', res.token);
                        // redirect to /me.
                        $location.path('/admin/me');
                    }
                });
        };
}]);