var app = angular.module('myApp');

app.controller('NavController', ['$scope', function ($scope) {
      
}]);

app.controller('AddController', ['$scope', '$http', function ($scope, $http) {
    $scope.master = {};
    $scope.activePath = null;

    $scope.add_new = function (user, AddNewForm) {
        console.log(user);

        $http
            .post('api/add_user', user)
            .success(function () {
                $scope.reset();
                $scope.activePath = $location.path('/');
            });

        $scope.reset = function () {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();
    };
}]);

app.controller('MainController', ['$scope', function ($scope) {
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