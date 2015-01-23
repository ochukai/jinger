app.controller('BrandIndexController', ['$scope', 'Brand',
    function ($scope, Brand) {

        var pageRequest = {
            page: 1,
            pageSize: 8,
            brandName: ($scope.queryBrandName || '').trim()
        };

        var page = Brand.query(pageRequest, function () {
            
            console.log(page);
            
            $scope.page = page;
            $scope.data = page.data;
        });

    }]);