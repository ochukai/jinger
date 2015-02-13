app.controller('ProductEditController',
    ['$scope', 'FileUploader', '$routeParams', '$location', 'Product', 'alertService',
    function ($scope, FileUploader, $routeParams, $location, Product, alertService) {

        $scope.content = "hello world";

        $scope.config = {
            minHeight       : 200,
            width           : '100%',
            resizeType      : 1,
            themeType       : 'simple',
            imageUploadJson : '',
            langType        : 'zh_CN',
            fillDescAfterUploadImage : true,
            items : [
                'source', '|',
                'undo', 'redo', '|',
                'preview', 'print', 'template', 'cut', 'copy', 'paste', 'plainpaste', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'clearhtml', 'quickformat', '|',
                'fullscreen',
                '/',
                'formatblock', 'fontname', 'fontsize', '|',
                'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                'image', 'multiimage', 'insertfile', 'table', 'hr', 'emoticons', 'pagebreak', 'link', 'unlink'
            ]
        };

        var uploader = $scope.uploader = new FileUploader({ url: '/admin/uploads' });

        $scope.isUpdate = ($routeParams.id) ? true : false;

        $scope.product = $scope.isUpdate ?
            Product.show({ id: $routeParams.id }) : new Product();

        uploader.filters
            .push({
                name: 'imageFilter',
                fn: function (item /*{File|FileLikeObject}*/) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

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