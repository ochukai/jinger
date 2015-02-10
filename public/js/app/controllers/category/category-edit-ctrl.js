app.controller('CategoryEditController',
    ['$scope', '$routeParams', '$location', 'Category', 'alertService',
    function ($scope, $routeParams, $location, Category, alertService) {

        $scope.isUpdate = ($routeParams.id) ? true : false;

        $scope.category = $scope.isUpdate ?
            Category.show({ id: $routeParams.id }) : new Category();

        // TODO pageable select list
        var categories = Category.query({ pageSize: 10000 }, function () {
            $scope.categories = categories.data;
        });

        $scope.submit = function () {

            var success = function () {
                    alertService.addSuccess('ok.');
                    console.log('uc success');

                    $location.path('/admin/category');
                },
                failure = function () {
                    alertService.addDanger('error.');
                    console.log('uc failure');
                };

            if ($scope.isUpdate) {
                Category.update({ id : $scope.category.id }, $scope.category, success, failure);
            } else {
                Category.create($scope.category, success, failure);
            }
        };
    }]);