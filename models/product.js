/**
 * This is product.
 */
var app         = require('express'),
    bookshelf   = app.get('bookshelf'),
    
	Category    = require('./category'),
	Picture     = require('./picture'),
    Brand       = require('./brand'),
	Product;

Product = bookshelf.Model.extend({

	tableName : 'products',
    
    // many-to-many
	categories : function() {
		return this.belongsToMany(Category);
	},
    
    // many-to-many
	pictures : function() {
		return this.belongsToMany(Picture);
	},
    
    // many-to-one
    brand: function() {
        return this.belongsTo(Brand);
    }
    
});

module.exports = Product;
