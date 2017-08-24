myAppModule.controller('AccessRoleController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, $location) {

    GetDataServices.getListofAccess().then(function (response) {
        $scope.AccessRoleList = response.data;
    })

    PermissionServices.AccessRoleList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })
}])