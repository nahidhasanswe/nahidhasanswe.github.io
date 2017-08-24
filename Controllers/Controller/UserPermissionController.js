myAppModule.controller('UserPermissionController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices) {
    GetDataServices.getUserPermissionList().then(function (response) {
        $scope.UserPermission = response.data;
    })
}])