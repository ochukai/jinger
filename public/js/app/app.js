'use strict';

// in order to make $routeProvider works well, it's necessary to load ngRoute plugin.
var app = angular.module('myApp', 
            [
                'ngAnimate', 
                'ngRoute',
                'ngResource',
                'ui.bootstrap',
                'angular-storage',
                'angular-loading-bar',
                'angularFileUpload',
                'ngKeditor'
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
        
            // Login, Logout, Register
            .when('/admin/login', {
                templateUrl: '/admin/partials/login',
                controller: 'LoginController'
            })
            .when('/admin/register', {
                templateUrl: '/admin/partials/register',
                controller: 'RegisterController'
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

            // category
            .when('/admin/category', {
                templateUrl: '/admin/partials/category-list',
                controller: 'CategoryIndexController'
            })
            .when('/admin/category/new', {
                templateUrl: '/admin/partials/category-edit',
                controller: 'CategoryEditController'
            })
            .when('/admin/category/:id', {
                templateUrl: '/admin/partials/category-show',
                controller: 'CategoryShowController'
            })
            .when('/admin/category/:id/edit', {
                templateUrl: '/admin/partials/category-edit',
                controller: 'CategoryEditController'
            })
        
            // product
            .when('/admin/product', {
                templateUrl: '/admin/partials/product-list',
                controller: 'ProductIndexController'
            })
            .when('/admin/product/new', {
                templateUrl: '/admin/partials/product-edit',
                controller: 'ProductEditController'
            })
            .when('/admin/product/:id', {
                templateUrl: '/admin/partials/product-show',
                controller: 'ProductShowController'
            })
            .when('/admin/product/:id/edit', {
                templateUrl: '/admin/partials/product-edit',
                controller: 'ProductEditController'
            })

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