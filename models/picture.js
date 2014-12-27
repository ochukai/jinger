/**
 * This is admin.
 */
var app         = require('express'),
    bookshelf   = app.get('bookshelf'),
    
	Product		= require('./product'),
	Picture;

Picture = bookshelf.Model.extend({

	tableName : 'pictures'

//	products : function() {
//		return this.belongsToMany(Product);
//	}
    
});

module.exports = Picture;
