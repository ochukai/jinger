app.controller('BrandEditController', 
            ['$scope', 'FileUploader', '$q', '$routeParams', '$location', 'Brand',
    function ($scope, FileUploader, $q, $routeParams, $location, Brand) {
        
        // if ($routeParams.id) {
        //     $scope.contact = Contact.show({
        //         id: $routeParams.id
        //     });
        // } else {
        //     $scope.contact = new Contact();
        // }

        var brand = {};

        var uploader = $scope.uploader = new FileUploader({
            url: '/admin/uploads'
        });

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            
            brand.name = $scope.brandName;
            brand.picUrl = response.url;
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        function success(response) {
            console.log("success", response)
            $location.path("/admin/brand");
        }

        function failure(response) {
            console.log("failure", response)

            // _.each(response.data, function (errors, key) {
            //     if (errors.length > 0) {
            //         _.each(errors, function (e) {
            //             $scope.form[key].$dirty = true;
            //             $scope.form[key].$setValidity(e, false);
            //         });
            //     }
            // });
        }

        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');

            // if ($routeParams.id) {
            //     // Contact.update($scope.contact, success, failure);
            // } else {
            //     Brand.create(brand, success, failure);
            // }

            console.info(brand);
            Brand.create(brand, success, failure);
        };

        $scope.submit = function () {
            uploader.uploadAll();
        };

    }]);