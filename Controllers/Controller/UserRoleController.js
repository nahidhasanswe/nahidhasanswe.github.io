myAppModule.controller('UserRoleController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    GetDataServices.getUserRoleList().then(function (response) {
        $scope.UserRoleList = response.data;
    })

    PermissionServices.UserRoleList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    GetDataServices.getListofAccess().then(function (response) {
        $scope.PermissionList = response.data;
    })

    GetDataServices.getRolePermission().then(function (response) {
        $scope.AccessListRole = response.data;
    })

    $scope.viewPermission = function (ev, userRole) {
        $scope.UserRole = userRole;

        $mdDialog.show({
            templateUrl: 'Views/Modal/User Role/ViewUserPermission.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updatePermissionModal = function (ev, userRole) {
        $scope.UserRole = {};
        angular.copy(userRole, $scope.UserRole);

        $scope.selected = [];
        angular.copy($scope.UserRole.AccessList, $scope.selected);

        $mdDialog.show({
            templateUrl: 'Views/Modal/User Role/UpdateUserRole.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updatePermission = function (invalid, ev, userRole) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else if($scope.selected.length==0){
            Notification.error('Atleast one Role will be selected');
        }else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update Role and Permission information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            var permissionList = [];
            angular.forEach($scope.selected, function (value, key) {
                permissionList.push(value.Name);
            })

            var MainObject = { EmployeeId: userRole.EmployeeId, RoleId: userRole.RoleId, PermissionName: permissionList };

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateUserRole(MainObject).then(function (response) {
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


    $scope.changeRole = function (roleId) {
        if (roleId == undefined) {
            $scope.selected = [];
        } else {
            $scope.selected = [];
            var assignPermission = $filter('filter')($scope.AccessListRole, { RoleId: roleId });
            angular.copy(assignPermission[0].PermissionNameList, $scope.selected);

        }
    }

    $scope.hide = function () {
        $mdDialog.hide();
    }

    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        var idx = getIndex(list, item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return getIndex(list, item) > -1;
    };

    $scope.isIndeterminate = function () {
        return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.PermissionList.length);
    };

    $scope.isChecked = function () {
        return $scope.selected.length === $scope.PermissionList.length;
    };

    $scope.toggleAll = function () {
        if ($scope.selected.length === $scope.PermissionList.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.PermissionList.slice(0);
        }
    };

    function getIndex(box, objectId) {
        var index = box.map(function (e) { return e.Id; }).indexOf(objectId.Id);
        return index;
    }
}])