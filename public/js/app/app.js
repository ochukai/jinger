'use strict';

// in order to make $routeProvider works well, it's necessary to load ngRoute plugin.
var app = angular.module('myApp', 
            [
                'ngAnimate',
                'ngStorage',
                'ngRoute',
                'angular-loading-bar'
            ], 
            function () {
                // load nav.js
                responsiveNav("nav-sider", { customToggle: ".nav-toggle" });
            })

            // config the $routeProvider.
            .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

                $routeProvider
                    .when('/', {
                        templateUrl: '/tpl/main.html',
                        controller: 'MainController'
                    })
                    .when('/add', {
                        templateUrl: '/tpl/new.html',
                        controller: 'AddController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        
  
    //         $httpProvider.interceptors
    //            .push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    //                return {
    //                    'request': function (config) {
    //                        config.headers = config.headers || {};
    //                        if ($localStorage.token) {
    //                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
    //                        }
    //                        return config;
    //                    },
    //                    'responseError': function(response) {
    //                        if(response.status === 401 || response.status === 403) {
    //                            $location.path('/signin');
    //                        }
    //                        return $q.reject(response);
    //                    }
    //                };
    //            }]);
        
            }]);
