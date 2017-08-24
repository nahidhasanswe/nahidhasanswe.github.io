myAppModule.factory('GetDataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var factory = [];

    factory.getEmployeeList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetEmployeeList');
    }

    factory.getDesignataionList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetDesignationList');
    }

    factory.getDepartmentList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetDepartmentList');
    }

    factory.getSectionList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetSectionList');
    }

    factory.getCompanyList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetCompanyList');
    }
    factory.getBranchList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetBranchList');
    }

    factory.getCustomerList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetCustomerList');
    }

    factory.getRoleList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetRoleList');
    }

    factory.getUserRoleList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetUserRoleList');
    }

    factory.getPermissionList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetPermissionList');
    }
    factory.getUserPermissionList = function () {
        return $http.get(serviceBasePath + '/api/Account/GetUserPermissionList');
    }

    factory.getTransactionListList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetTransactionList');
    }
    factory.getAccessRoleList = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetAccessRoleList');
    }

    factory.getListofAccess = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetListAccessRole')
    }

    factory.getRolePermission = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetRoleWisePermission')
    }
    factory.getAuditReport = function () {
        return $http.get(serviceBasePath + '/api/Activities/GetAuditReport')
    }

    

    return factory;
}])