/**
 * Showing a list that could display all the brands by page.
 */
app.controller('BrandIndexController', ['$scope', 'Brand',
    function ($scope, Brand) {

        $scope.queryByName = function(){
            $scope.toPage(1);
        };

        $scope.toPage = function (pageNumber) {

            var pageRequest = {
                page: pageNumber,
                pageSize: 6,
                brandName: ($scope.queryBrandName || '').trim()
            };

            console.log('toPage(pageRequest): ', pageRequest);

            var page = Brand.query(pageRequest, function () {
                $scope.brands = page.data;
                $scope.pageModel = {
                    page     : page.page,
                    pageSize : page.pageSize,
                    total    : page.total
                };
                console.log('query finish.', $scope.pageModel);
            });
        };

        $scope.toPage(1);

    }]);