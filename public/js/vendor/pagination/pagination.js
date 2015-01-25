var myModule = angular.module('hello', []);

myModule.controller('pagingCtrl', function ($scope, $http) {
    $scope.data = [
        {
            id: 1,
            name: "a"
        }, {
            id: 2,
            name: "b"
        }
    ];

    $scope.currentPage = 1;
    $scope.numPages = 5;
    $scope.pageSize = 10;
    $scope.pages = [];

    $scope.onSelectPage = function (page) {};
});

myModule.directive('paging', function () {
    return {
        restrict: 'E',
        //scope: {
        //    numPages: '=',
        //    currentPage: '=',
        //    onSelectPage: '&'
        //},
        template: '',
        replace: true,
        link: function (scope, element, attrs) {

            scope.$watch('numPages', function (value) {
                scope.pages = [];
                for (var i = 1; i <= value; i++) {
                    scope.pages.push(i);
                }
                alert(scope.currentPage)
                if (scope.currentPage > value) {
                    scope.selectPage(value);
                }
            });

            scope.isActive = function (page) {
                return scope.currentPage === page;
            };

            scope.selectPage = function (page) {
                if (!scope.isActive(page)) {
                    scope.currentPage = page;
                    scope.onSelectPage(page);
                }
            };

            scope.selectPrevious = function () {
                if (!scope.noPrevious()) {
                    scope.selectPage(scope.currentPage - 1);
                }
            };

            scope.selectNext = function () {
                if (!scope.noNext()) {
                    scope.selectPage(scope.currentPage + 1);
                }
            };

            scope.noPrevious = function () {
                return scope.currentPage == 1;
            };

            scope.noNext = function () {
                return scope.currentPage == scope.numPages;
            };

        }
    };
});
