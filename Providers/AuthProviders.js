'use strict';

var AuthApp = angular.module('AuthApp', ['LocalStorageModule']);


// Global Variable for base path
AuthApp.constant('serviceBasePath', 'http://www.serverside.com');

AuthApp.factory('AuthData', ['localStorageService', function (localStorageService) {
    var authServiceFactory = {};

    authServiceFactory.getRoleName = function () {

        var authData = localStorageService.get('authorizationData');

        var auth = {
            Role: 'Anonymous',
            Name: 'Anonymous User'
        }

        if (authData) {
            auth.Role = authData.Role;
            auth.Name = authData.userName
            return auth;
        } else
            return auth
    }
    
    return authServiceFactory;
}])

AuthApp.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', 'AuthData', '$window', function ($q, $injector, $location, localStorageService, AuthData, $window) {

    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    authInterceptorServiceFactory.responseError = function (rejection) {
        console.log(rejection);
        if (rejection.status == 401) {
            $location.path('/login');
            $window.location.reload();
        }
        return $q.reject(rejection);
    };

    return authInterceptorServiceFactory;

}]);


AuthApp.factory('authService', ['$http', '$q', 'localStorageService', 'serviceBasePath', function ($http, $q, localStorageService, serviceBasePath) {
    
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    authServiceFactory.IdentifyAuth = function () {

        var authData = localStorageService.get('authorizationData');

        if (authData) {
            return true;
        } else
            throw new NotImplementedError('Unauthenticate');
    }

    function NotImplementedError(message) {
        this.name = "Authentication and Authorization";
        this.message = (message || "");
    }

    authServiceFactory.getAuthInfo = function () {

        var authData = localStorageService.get('authorizationData');

        if (authData) {
            return { userId: authData.userId, isAuth: true };
        } else {
            return { userId: "", isAuth: false};
        }

    }

    authServiceFactory.saveRegistration = function (registration) {

        authServiceFactory.logOut();

        return $http.post(serviceBasePath + '/api/account/register', registration)
    };

    authServiceFactory.login = function (loginData) {

        var obj = { 'username': loginData.userName, 'password': loginData.password, 'grant_type': 'password' };

        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        var deferred = $q.defer();

        $http({
            method: 'post',
            url: serviceBasePath + "/token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            var storage = {
                token: response.data.access_token,
                userName: response.data.userName,
                userId: response.data.EmployeeId
            }

            localStorageService.set('authorizationData', storage, 'localStorage');

            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error.data);
        })
        return deferred.promise;
    }

    authServiceFactory.logOut = function () {
        $http.post(serviceBasePath + '/api/Account/Logout').then(function (response) {
            localStorageService.remove('authorizationData');
        })
       
    };

    authServiceFactory.changePassword = function (data) {
        return $http.post(serviceBasePath + '/api/account/ChangePassword', data)
    }

    return authServiceFactory;
}]);