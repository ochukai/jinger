app.controller('ProductIndexController',
    ['$scope', 'Product',
    function ($scope, Product) {

        $scope.toPage = function (pageNumber) {

            var pageRequest = {
                page: pageNumber,
                pageSize: 6
                //brandName: ($scope.queryBrandName || '').trim()
            };

            console.log('toPage(pageRequest): ', pageRequest);

            var page = Product.query(pageRequest, function () {
                $scope.products = page.data;
                $scope.pageModel = {
                    page     : page.page,
                    pageSize : page.pageSize,
                    total    : page.total
                };
                console.log('query finish.', $scope.pageModel);
            });
        };

        // show page one by default.
        $scope.toPage(1);

        $scope.remove = function (id) {};

        $scope.edit = function (id) {};
    }]);