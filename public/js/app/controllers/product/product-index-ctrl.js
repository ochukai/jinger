app.controller('ProductIndexController',
    ['$scope', 'Product', 'Category', 'Brand', '$modal', 'alertService',
    function ($scope, Product, Category, Brand, $modal, alertService) {

        $scope.queryProductBrand = 0;
        $scope.queryProductType = 0;
        $scope.queryProductCategory = 0;
        $scope.queryProductName = '';

        var types = Product.types(function () {
            $scope.types = types;
        });

        var brands = Brand.query({ pageSize : 10000}, function () {
            $scope.brands = brands.data;
        });

        var categories = Category.query({ pageSize: 10000 }, function () {
            $scope.categories = categories.data;
        });

        $scope.queryByCondition = function () {
            $scope.toPage(1);
        };

        $scope.toPage = function (pageNumber) {

            var pageRequest = {
                page       : pageNumber,
                pageSize   : 6,
                brandId    : $scope.queryProductBrand || 0,
                typeId     : $scope.queryProductType || 0,
                categoryId : $scope.queryProductCategory || 0,
                name       : $scope.queryProductName
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

        function removeProduct(id) {
            var success = function () {
                    // give some info
                    alertService.addDanger('删除了：' + id);
                    console.log('ok(delete): ' + id);

                    // refresh list.
                    var currentPage = $scope.pageModel.page;
                    $scope.toPage(currentPage);
                },

                // error happens during the remove process.
                failure = function() {
                    alertService.addDanger('删除的时候出了一些问题，请稍后再试一次!');
                };

            Product.destroy({id : id}, success, failure);
        }

        $scope.remove = function (id) {
            $scope.modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                /* shit */
                controller: 'ProductIndexController',
                scope: $scope
            });

            $scope.modalInstance
                .result.then(
                    function () {
                        removeProduct(id);
                    },
                    function () {
                        alertService.addInfo('什么都没有发生。');
                        console.log('cancel');
                    }
                );
        };

        $scope.ok = function () {
            $scope.modalInstance.close('delete');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.edit = function (id) {
            console.log('product edit.');
            $location.path('/admin/product/' + id + '/edit');
        };
    }]);