myAppModule.factory('PermissionServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var factory = [];

    factory.EmployeeList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/EmployeeList');
    };

    factory.CustomerList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/CustomerList');
    };

    factory.TransactionList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/TransactionList');
    };

    factory.BranchList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/BranchList');
    };

    factory.DepartmentList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/DepartmentList');
    };

    factory.DesignationList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/DesignationList');
    };

    factory.SectionList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/SectionList');
    };

    factory.RoleList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/RoleList');
    };

    factory.UserRoleList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/UserRoleList');
    };

    factory.PermissionList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/PermissionList');
    };

    factory.AccessRoleList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/AccessRoleList');
    };

    factory.CompanyList = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/CompanyList');
    };

    factory.AuditTrial = function (data) {
        return $http.get(serviceBasePath + '/api/Permission/AuditTrial');
    };


    return factory;

}]);