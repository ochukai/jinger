app.factory('Brand', ['$resource', function($resource) {
    var resource = $resource(
        '/admin/brand/:id',
        { id: '@_id' },
        {
            'create':  { method: 'POST' },
            'query':   { method: 'GET', isArray: false },
            'show':    { method: 'GET', isArray: false },
            'update':  { method: 'PUT' },
            'destroy': { method: 'DELETE' }
        }
    );
    return resource;
}]);