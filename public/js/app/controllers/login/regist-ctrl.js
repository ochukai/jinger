app.controller('RegistController', ['$rootScope', '$scope', '$location', 'store', 'LoginService',
    function ($rootScope, $scope, $location, store, LoginService) {
        $scope.regist = function () {
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