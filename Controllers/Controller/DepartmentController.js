myAppModule.controller('DepartmentController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    GetDataServices.getDepartmentList().then(function (response) {
        $scope.DepartmentList = response.data;
    })

    PermissionServices.DepartmentList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.addDepartment = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Modal/Department/AddDepartment.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveDepartment = function (invalid, ev, department) {
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit Department information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveDepartment(department).then(function (response) {
                    Notification.success(response.data);
                    $mdDialog.hide();
                    $route.reload();
                }, function (error) {
                    if (error.status == 403) {
                        Notification.error("You don't have permission to perform the operation")
                    } else {
                        Notification.error(error.data.Message);
                    }
                })
            }, function () {
                Notification.warning('Cancel');
            });
        }
    }

    $scope.updateDepartmentModal = function (ev, department) {
        $scope.Department = {};
        angular.copy(department, $scope.Department);

        $mdDialog.show({
            templateUrl: 'Views/Modal/Department/UpdateDepartment.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updateDepartment = function (invalid, ev, department) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update Department information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            var Dept = {
                Id: department.DepartmentId,
                Name:department.DepartmentName
            }

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateDepartment(Dept).then(function (response) {
                    Notification.success(response.data);
                    $mdDialog.hide();
                    $route.reload();
                }, function (error) {
                    if (error.status == 403) {
                        Notification.error("You don't have permission to perform the operation")
                    } else {
                        Notification.error(error.data.Message);
                    }
                })
            }, function () {
                Notification.warning('Cancel');
            });
        }
    }

    $scope.hide = function () {
        $mdDialog.hide();
    }
}])