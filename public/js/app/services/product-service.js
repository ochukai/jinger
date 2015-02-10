app.factory("Product", function($resource, $http) {
    var resource = $resource(
        "/admin/product/:id",
        { id: "@_id" },
        {
            'create':  { method: 'POST' },
            'query':   { method: 'GET', isArray: false },
            'show':    { method: 'GET', isArray: false },
            'update':  { method: 'PUT' },
            'destroy': { method: 'DELETE' }
        }
    );
    return resource;
});