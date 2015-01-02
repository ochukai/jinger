'use strict';

// in order to make $routeProvider works well, it's necessary to load ngRoute plugin.
var app = angular.module('myApp', 
            [
                'ngAnimate', 
                'ngRoute',
                'angular-storage',
                'angular-loading-bar'
            ]);

// config the $routeProvider.
app.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                template: '',
                controller: 'MainController'
            })
            .when('/me', {
                templateUrl: '/tpl/me.html',
                controller: 'MainController'
            })
            .when('/login', {
                templateUrl: '/tpl/login.html',
                controller: 'LoginController'
            })
            .when('/regist', {
                templateUrl: '/tpl/regist.html',
                controller: 'LoginController'
            })          
            .when('/logout', {
                templateUrl: '/tpl/logout.html',
                controller: 'LoginController'
            }) 
            .when('/product', {
                templateUrl: '/tpl/product.html',
                controller: 'ProductController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors
            .push(['$q', '$location', 'store',
                function ($q, $location, store) {
                    return {
                        'request': function (config) {
                            config.headers = config.headers || {};
                            var token = store.get('token');
                            if (token) {
                                config.headers.Authorization = 'Bearer ' + token;
                            }
                            return config;
                        },
                        'responseError': function (response) {
                            if (response.status === 401 || response.status === 403) {
                                $location.path('/login');
                            }
                            return $q.reject(response);
                        }
                    };
                }]);
            }]);