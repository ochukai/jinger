app.controller('BrandEditController', 
    ['$scope', 'FileUploader', '$q', '$routeParams', '$location', 'Brand', 'alertService',
    function ($scope, FileUploader, $q, $routeParams, $location, Brand, alertService) {

        var uploader = $scope.uploader = new FileUploader({ url: '/admin/uploads' });

        $scope.isUpdate = ($routeParams.id) ? true : false;

        $scope.brand = $scope.isUpdate ?
            Brand.show({ id: $routeParams.id }) : new Brand();

        $scope.submit = function () {

            // if an image is selected, it should be uploaded firstly.
            if (uploader.queue.length > 0) {
                console.log('exist file to upload.');
                uploader.uploadAll();
            } else {
                submitOrUpdate();
            }
        };

        function submitOrUpdate() {

            var success = function () {
                    alertService.addSuccess('ok.');
                    console.log('uc success');

                    $location.path('/admin/brand');
                },
                failure = function () {
                    alertService.addDanger('error.');
                    console.log('uc failure');
                };

            if ($scope.isUpdate) {
                Brand.update({ id : $scope.brand.id }, $scope.brand, success, failure);
            } else {
                Brand.create($scope.brand, success, failure);
            }
        }

        uploader.filters
            .push({
                name: 'imageFilter',
                fn: function (item /*{File|FileLikeObject}*/) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.brand.picUrl = response.url;
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
            submitOrUpdate();
        };

    }]);