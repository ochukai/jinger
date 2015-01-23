'use strict';

// in order to make $routeProvider works well, it's necessary to load ngRoute plugin.
var app = angular.module('myApp', 
            [
                'ngAnimate', 
                'ngRoute',
                'ngResource',
                'angular-storage',
                'angular-loading-bar',
                'angularFileUpload'
            ]);

// config the $routeProvider.
app.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {
            
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/admin', { 
                templateUrl: '/admin/partials/me',
                controller: 'MainController'
            })
        
            // Login, Logout, Regist
            .when('/admin/login', {
                templateUrl: '/admin/partials/login',
                controller: 'LoginController'
            })
            .when('/admin/regist', {
                templateUrl: '/admin/partials/regist',
                controller: 'RegistController'
            })          
            .when('/admin/logout', {
                templateUrl: '/admin/partials/logout',
                controller: 'LogoutController'
            }) 
            
            // brand
            .when("/admin/brand", {
                templateUrl: "/admin/partials/brand-list",
                controller: "BrandIndexController"
            })
            .when("/admin/brand/new", {
                templateUrl: "/admin/partials/brand-edit",
                controller: "BrandEditController"
            })
            .when("/admin/brand/:id", {
                templateUrl: "/admin/partials/brand-show",
                controller: "BrandShowController"
            })
            .when("/admin/brand/:id/edit", {
                templateUrl: "/admin/partials/brand-edit",
                controller: "BrandEditController"
            })
        
            // product admin start
            .when('/product', {
                templateUrl: '/tpl/product/list.html',
                controller: 'ProductController'
            })
            .when('/product/new', {
                templateUrl: '/tpl/product/new.html',
                controller: 'ProductController'
            })
            // product end
        
            // category admin start
            .when('/category', {
                templateUrl: '/tpl/category/list.html',
                controller: 'CategoryController'
            })
            .when('/category/new', {
                templateUrl: '/tpl/category/new.html',
                controller: 'CategoryController'
            })
            // category end
        
            .otherwise({
                redirectTo: '/admin'
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
                                $location.path('/admin/login');
                            }
                            return $q.reject(response);
                        }
                    };
                }]);
            }]);