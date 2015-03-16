app.controller('ProductEditController',
    ['$scope', 'FileUploader', '$routeParams', '$location', 'Product', 'Category', 'Brand', 'alertService',
    function ($scope, FileUploader, $routeParams, $location, Product, Category, Brand, alertService) {

        $scope.isUpdate = ($routeParams.id) ? true : false;

        $scope.product = $scope.isUpdate ?
            Product.show({ id: $routeParams.id }) : new Product();

        // =============================
        $scope.checkedCategories = $scope.product.categories || [12];

        var categories = Category.query({ pageSize: 10000 }, function () {
            $scope.categories = categories.data;

            for (var i = 0; i < $scope.checkedCategories.length; i++) {
                var cid = $scope.checkedCategories[i];
                for (var j = 0; j < $scope.categories.length; j++) {
                    if ($scope.categories[j].id === cid) {
                        $scope.categories[j].checked = true;
                        break;
                    }
                }
            }
        });

        $scope.$watch('categories|filter:{checked:true}', function (nv) {
            $scope.product.categories = nv.map(function (category) {
                return category.id;
            });
        }, true);
        // =============================//

        var types = Product.types(function () {
            $scope.types = types;
        });

        var brands = Brand.query({ pageSize : 10000}, function () {
            $scope.brands = brands.data;
        });

        $scope.config = {
            minHeight       : 200,
            width           : '100%',
            resizeType      : 1,
            themeType       : 'simple',
            imageUploadJson : '/admin/uploads',
            langType        : 'zh_CN',
            fillDescAfterUploadImage : true,
            items : [
                'source', '|',
                'undo', 'redo', '|',
                'preview', 'print', 'template', 'cut', 'copy', 'paste', 'plainpaste', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'clearhtml', 'quickformat', '|',
                'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|',
                'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                'image', 'multiimage', 'insertfile', 'table', 'hr', 'emoticons', 'pagebreak', 'link', 'unlink'
            ]
        };

        var uploader = $scope.uploader = new FileUploader({ url: '/admin/uploads' });

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
            // $scope.brand.picUrl = response.url;
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
            submitOrUpdate();
        };

        $scope.submit = function () {

            console.log($scope.product);

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

                    $location.path('/admin/product');
                },
                failure = function () {
                    alertService.addDanger('error.');
                    console.log('uc failure');
                };

            if ($scope.isUpdate) {
                Product.update({ id : $scope.product.id }, $scope.product, success, failure);
            } else {
                Product.create($scope.product, success, failure);
            }
        }

    }]);