/**
 * This is admin.
 */
var app         = require('express'),
    bookshelf   = app.get('bookshelf'),
    
	Product		= require('./product'),
	Category;

Category = bookshelf.Model.extend({

	tableName : 'categories',

	products : function() {
		return this.belongsToMany(Product);
	}
    
});

module.exports = Category;
