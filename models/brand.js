/**
 * This is admin.
 */
var app         = require('express'),
    bookshelf   = app.get('bookshelf'),
    
    Product     = require('./product'),
	Brand;

Brand = bookshelf.Model.extend({

	tableName : 'brands'
    
//    products : function() {
//        return this.hasMany(Product);
//    }
    
});

module.exports = Brand;
