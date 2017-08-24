myAppModule.controller('RoleController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    GetDataServices.getRoleList().then(function (response) {
        $scope.RoleList = response.data;
    })

    PermissionServices.RoleList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.addRole = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Modal/Role/AddRole.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveRole = function (invalid, ev, role) {
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit Role information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveRole(role).then(function (response) {
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

    $scope.updateRoleModal = function (ev, role) {
        $scope.Role = {};
        angular.copy(role, $scope.Role);

        $mdDialog.show({
            templateUrl: 'Views/Modal/Role/UpdateRole.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updateRole = function (invalid, ev, role) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update Role information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            var RoleObj = {
                Id: role.RoleId,
                RoleName: role.RoleName,
            }

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateRole(RoleObj).then(function (response) {
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

