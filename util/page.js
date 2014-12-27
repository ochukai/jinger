var Page = function (params) {
    this.data = params.data || null;
    this.total = params.total || 0;

    this.pageSize = params.pageSize || 10;
    this.page = params.page || 1;

    this.pageCount = Math.ceil(this.total / this.pageSize);
};

Page.prototype.hasData = function () {
    return this.date ? true : false;
};

Page.prototype.data = function () {
    return this.data;
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

Page.prototype.current = function () {
    return this.page;
};

Page.prototype.next = function () {
    return this.hasNext() ? (this.page + 1) : this.pageCount;
};

Page.prototype.hasNext = function () {
    return this.page > 1;
};

Page.prototype.hasPrevious = function () {
    return this.page < this.pageCount;
};

Page.prototype.isFirst = function () {
    return this.page === 1;
};

Page.prototype.isLast = function () {
    return this.page === this.pageCount;
};

Page.prototype.toJson = function () {};

module.exports = Page;