myAppModule.factory('EmployeeDataServices', ['$http', function ($http) {
    var fac = [];

    fac.getLeaveDetails=function()
    {
        return $http.get('/Helper JSON/leaveDetails.json');
    }

    return fac;
}])