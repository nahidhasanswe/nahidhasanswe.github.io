myAppModule.controller('AuditController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $location) {
    PermissionServices.AuditTrial().then(function (response) {

    },function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    GetDataServices.getAuditReport().then(function (response) {
        $scope.Report = response.data;
    })


    $scope.ViewDetails = function (ev, data) {
        $scope.audit = data;

        $scope.before = JSON.parse(data.BeforeData);
        $scope.after = JSON.parse(data.AfterData);

        $mdDialog.show({
            templateUrl: 'Views/Modal/Audit Report/AuditReport.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.showChangeData = function (ev, before,after) {

        $scope.Before = before;
        $scope.After = after;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Audit Report/ViewChangeData.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.hide = function () {
        $mdDialog.hide();
    }
}])