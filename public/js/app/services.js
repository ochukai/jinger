'use strict';

var app = angular.module('myApp');

var baseUrl = "http://localhost:3000/admin";

app.factory('LoginService', ['$http',
    function ($http) {
        return {
            regist: function (data) {
                return $http.post(baseUrl + '/signup', data);
            },
            login: function (data) {
                return $http.post(baseUrl + '/signin', data);
            }
        };
    }]);

app.factory('MenuService', ['$http', '$rootScope', 'store',
    function ($http, $rootScope, store) {

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = store.get('token');
            var user = {};
            if (typeof token !== 'undefined' && token != null) {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        
        var currentUser = getUserFromToken();

        return {
            // get all menus of current user.
            myMenus: function () {
                var data = {
                    id: currentUser.id
                };
                return $http.post(baseUrl + '/mymenus', data);
            }
        };
    }]);