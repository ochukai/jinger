/**
 * Showing a pagination bar on the bottom of the list page.
 */
app.directive('paginat', function () {

    var Page = function (params) {

        this.total = Number(params.total) || 0;
        var _page  = this.page  = Number(params.page)  || 1;

        this.pageSize  = Number(params.pageSize) || 10;
        var _total = this.pageCount = Math.ceil(this.total / this.pageSize);

        // '<' '1' '...' '4' '5' '6' '...' '12' '>'
        this.pages = generatePages();
        console.log('pages: ' + this.pages);

        function generatePages() {

            if (_total <= 0) {
                return null;
            }

            var retPages = [],
                start = 0,
                end = 0;

            console.log('_page: ', _page, '_total: ', _total);

            // 1. add the first number.
            if (_page >= 8 && _total > 13) {
                retPages.push('1');
                retPages.push('...');

                start = _page - 4;
            } else {
                start = 1;
            }

            console.log('star:', start, '_page: ', (_page + 7), '_total: ', _total);

            // 2. compute the middle numbers at this pagination bar.
            if (_total <= 13
                || _total <= (start + 8)
                || _total <= (_page + 7)) {
                end = _total;
            } else {
                end = _page + 4;
            }

            console.log('end:', end, '_total:', _total);

            // 2.5 fill the numbers
            for (; start <= end; start++) {
                retPages.push(start + '');
            }

            // 3. at the end
            if (end != _total) {
                retPages.push('...');
                retPages.push(_total + '');
            }
            return retPages;
        }
    };

    Page.prototype.total = function () {
        return this.total;
    };

    Page.prototype.pageCount = function () {
        return this.pageCount;
    };

    Page.prototype.previous = function () {
        return this.hasPrevious() ? (this.page - 1) : 1;
    };

    Page.prototype.next = function () {
        return this.hasNext() ? (this.page + 1) : this.pageCount;
    };

    Page.prototype.hasNext = function () {
        return this.page < this.pageCount;
    };

    Page.prototype.isCurrent = function(pn) {
         console.log('isCurrent: ', this.page, '===', pn, '-->', (this.page === pn));
        return this.page == pn;
    };

    Page.prototype.hasPrevious = function () {
        return this.page > 1;
    };

    /**
     * this function will return false unless if a number-string be passed in.
     * @param pn
     * @returns {boolean}
     */
    Page.prototype.isNotNumber = function(pn){
             console.log('isNotNumber: ', pn);
        // return /[1-9]+/.test(pn);
        return '...' === pn;
    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/tpl/pagination.html',
        // scope:{
        //     pageModel: '=page',
        //     toPage: '&toPage'
        // },
        link: function (scope, element, attrs) {

            console.log('page link.', scope.pageModel);

            /**
             * there must a variable named 'pageModel' in the scope of parent controller.
             */
            scope.$watch('pageModel', function (newPage) {
                console.log('$watch in pagination-service: ', newPage);
                if (newPage) {
                    scope.page = new Page(newPage);
                }
            });

            scope.toPreviousPage = function () {
                var prev = scope.page.previous();
                console.log('toPreviousPage: ', prev);
                scope.toPage(prev);
            };

            scope.toSelectedPage = function (pn) {
                console.log('toSelectedPage: ', pn);
                scope.toPage(pn);
            };

            scope.toNextPage = function () {
                var next = scope.page.next();
                console.log('toNextPage: ', next);
                scope.toPage(next);
            };

        }
    };
});
