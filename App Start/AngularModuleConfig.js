var myAppModule = angular.module('leaveAppModule', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngMaterial', 'multipleDatePicker', 'ngAnimate', 'mdPickers', 'ui-notification', 'AuthApp', 'LocalStorageModule', 'ngPrettyJson', 'ngPassword']);

myAppModule.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

myAppModule.constant('serviceBasePath', 'http://www.serverside.com');


