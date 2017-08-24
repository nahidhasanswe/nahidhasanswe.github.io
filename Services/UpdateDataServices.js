myAppModule.factory('UpdateDataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var factory = [];

    factory.updateEmployeeInfo = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateEmployee', data);
    };

    factory.updateCustomer = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateCustomer', data);
    };

    factory.updateBranch = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateBranch', data);
    };

    factory.updateDepartment = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateDepartment', data);
    };

    factory.updateDesignation = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateDesignation', data);
    };

    factory.updateSection = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateSection', data);
    };

    factory.updateRole = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateRoles', data);
    };

    factory.updatePermission = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateRolePermission', data);
    };

    factory.updateUserRole = function (data) {
        return $http.post(serviceBasePath + '/api/Account/UpdateUserRole', data);
    };

    factory.updateCompany = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/UpdateGroup', data);
    };

    return factory;

}]);