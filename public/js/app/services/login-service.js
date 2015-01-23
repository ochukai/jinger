var adminBaseUrl = "http://localhost:3000/admin";

app.factory('LoginService', ['$http',
    function ($http) {
        return {
            regist: function (data) {
                return $http.post(adminBaseUrl + '/signup', data);
            },
            login: function (data) {
                return $http.post(adminBaseUrl + '/signin', data);
            }
        };
    }]);

app.factory('MenuService', ['$http', '$rootScope', 'store',
    function ($http, $rootScope, store) {
        return {
            // get all menus of current user.
            myMenus: function () {
                return $http.post(adminBaseUrl + '/mymenus');
            }
        };
    }]);