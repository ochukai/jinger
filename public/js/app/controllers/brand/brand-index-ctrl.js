/**
 * Showing a list that could display all the brands by page.
 */
app.controller('BrandIndexController',
    ['$scope', 'Brand', 'alertService', '$modal',
    function ($scope, Brand, alertService, $modal) {

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

        /*
         -------------------------------------------------
          delete
         -------------------------------------------------
         */
        $scope.remove = function (id) {
            $scope.modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                /* shit */
                controller: 'BrandIndexController',
                scope: $scope
            });

            $scope.modalInstance
                .result
                .then(
                    function () {
                        alertService.addDanger('删除了：' + id);
                        console.log('ok(delete): ' + id);
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

        /*
         -------------------------------------------------
         edit -- placeholder
         -------------------------------------------------
         */
        $scope.edit = function(){};

    }]);