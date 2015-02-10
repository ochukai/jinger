/**
 * Showing a list that could display all the categorys by page.
 */
app.controller('CategoryIndexController',
    ['$scope', 'Category', 'alertService', '$modal', '$location',
    function ($scope, Category, alertService, $modal, $location) {

        $scope.queryByName = function(){
            $scope.toPage(1);
        };

        $scope.toPage = function (pageNumber) {

            var pageRequest = {
                page: pageNumber,
                pageSize: 6,
                categoryName: ($scope.queryCategoryName || '').trim()
            };

            console.log('toPage(pageRequest): ', pageRequest);

            var page = Category.query(pageRequest, function () {

                console.log('query categories：', page.data);

                $scope.categories = page.data;
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
                controller: 'CategoryIndexController',
                scope: $scope
            });

            $scope.modalInstance
                .result.then(
                    function () {
                        removeCategory(id);
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

        function removeCategory(id) {
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

            Category.destroy({id : id}, success, failure);
        }

        /*
         -------------------------------------------------
         edit
         -------------------------------------------------
         */
        $scope.edit = function (id) {
            console.log('category edit.');
            $location.path('/admin/category/' + id + '/edit');
        };

    }]);