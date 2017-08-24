myAppModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;



    $routeProvider
    .when('/', {
        redirectTo: '/dashboard'
    })
    .when('/dashboard', {
        templateUrl: 'Views/dashboard.html',
        controller: 'dashController',
        authorize: true
    })
    .when('/myLeaveDetails', {
        templateUrl: 'Views/Employee Leave Plan/myLeavePlan.html',
        controller: 'myLeaveController',
        authorize: true
    })
    .when('/myYearlyLeavePlan', {
        templateUrl: 'Views/Employee Leave Plan/myYearlyLeavePlan.html',
        controller: 'myYearlyLeaveController',
        authorize: true
    })
    .when('/login', {
        templateUrl: 'Views/Account View/login.html',
        controller: 'loginController'
    })
    .when('/AccessRole', {
        templateUrl: 'Views/All View/AccessRoleList.html',
        controller: 'AccessRoleController',
        authorize: true
    })
    .when('/Branch', {
        templateUrl: 'Views/All View/BranchList.html',
        controller: 'BranchController',
        authorize: true
    })
    .when('/Company', {
        templateUrl: 'Views/All View/CompanyList.html',
        controller: 'CompanyController',
        authorize: true
    })
    .when('/Customer', {
        templateUrl: 'Views/All View/CustomerList.html',
        controller: 'CustomerController',
        authorize: true
    })
    .when('/Department', {
        templateUrl: 'Views/All View/DepartmentList.html',
        controller: 'DepartmentController',
        authorize: true
    })
    .when('/Designation', {
        templateUrl: 'Views/All View/DesignationList.html',
        controller: 'DesignationController',
        authorize: true
    })
    .when('/Employee', {
        templateUrl: 'Views/All View/EmployeeList.html',
        controller: 'EmployeeController',
        authorize: true
    })
    .when('/PermissionList', {
        templateUrl: 'Views/All View/PermissionList.html',
        controller: 'PermissionController',
        authorize: true
    })
    .when('/RoleList', {
        templateUrl: 'Views/All View/RoleList.html',
        controller: 'RoleController',
        authorize: true
    })
    .when('/SectionList', {
        templateUrl: 'Views/All View/SectionList.html',
        controller: 'SectionController',
        authorize: true
    })
    .when('/TransactionList', {
        templateUrl: 'Views/All View/TransactionList.html',
        controller: 'TransactionController',
        authorize: true
    })
    .when('/UserRole', {
        templateUrl: 'Views/All View/UserRoleList.html',
        controller: 'UserRoleController',
        authorize: true
    })
    .when('/AuditReport', {
        templateUrl: 'Views/All View/AuditReport.html',
        controller: 'AuditController',
        authorize: true
    })
    .when('/AccessDenied', {
        templateUrl: 'Views/Account View/AccessDenied.html',
        controller: 'errorController'
    })
    .otherwise({
        redirectTo: '/'
    })

    $locationProvider.hashPrefix('');
}]);
