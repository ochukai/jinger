app.factory("Product", function($resource, $http) {
    var resource = $resource(
        "/api/product/:id",
        { id: "@_id" },
        {
            'create':  { method: 'POST' },
            'index':   { method: 'GET', isArray: true },
            'show':    { method: 'GET', isArray: false },
            'update':  { method: 'PUT' },
            'destroy': { method: 'DELETE' }
        }
    );
    return resource;
});