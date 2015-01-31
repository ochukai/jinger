/**
 * Showing a list that could display all the brands by page.
 */
app.controller('BrandIndexController',
    ['$scope', 'Brand', 'alertService', '$modal', '$location',
    function ($scope, Brand, alertService, $modal, $location) {

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
                        removeBrand(id);
                    },
                    function () {
                        alertService.addInfo('什么都没有发生。');
                        console.log('cancel');
                    }
                );
        };

        /**
         * these code must be added to the first parameter when open method of $modal be called.
         *
         *  controller: 'BrandIndexController',
         *  scope: $scope
         *
         * a new scope will be created when the delete modal is opened, and the new scope is empty
         * unless we pass the two lines code.
         */
        $scope.ok = function () {
            $scope.modalInstance.close('delete');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        // function removeFromScopeById(id) {
        //     for (var i = 0; i < $scope.brands.length; i++) {
        //         var brand = $scope.brands[i];
        //         if(brand.id === id) {
        //             $scope.brands.splice(i, 1);
        //             return;
        //         }
        //     }
        // }

        function removeBrand(id) {
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

            Brand.destroy({id : id}, success, failure);
        }

        /*
         -------------------------------------------------
         edit -- placeholder
         -------------------------------------------------
         */
        $scope.edit = function(id){
            $location.path('/admin/brand/' + id + '/edit');
        };

    }]);