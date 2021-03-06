app.controller('RegisterController', ['$rootScope', '$scope', '$location', 'store', 'LoginService',
    function ($rootScope, $scope, $location, store, LoginService) {
        $scope.register = function () {
            var formData = {
                username: $scope.username,
                password: $scope.password
            };

            LoginService
                .regist(formData)
                .success(function (res) {
                    if (res.success) {
                        $location.path('/admin/login');
                    }
                });
        };
    }]);