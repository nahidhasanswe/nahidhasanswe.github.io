myAppModule.factory('SaveDataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var factory = [];

    factory.saveEmployeeInfo=function(data){
        return $http.post(serviceBasePath + '/api/Account/Register', data);
    };

    factory.saveUserAccount = function (data) {
        return $http.post(serviceBasePath + '/api/Account/AccountRagistration', data);
    };

    factory.saveCustomer = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveCustomer', data);
    };

    factory.saveTransaction = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveTransaction', data);
    };

    factory.saveBranch = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveBranch', data);
    };

    factory.saveDepartment = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveDepartment', data);
    };

    factory.saveDesignation = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveDesignation', data);
    };

    factory.saveSection = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveSection', data);
    };

    factory.saveRole = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveRoles', data);
    };

    factory.saveCompany = function (data) {
        return $http.post(serviceBasePath + '/api/Activities/SaveGroup', data);
    };

    

    return factory;

}]);