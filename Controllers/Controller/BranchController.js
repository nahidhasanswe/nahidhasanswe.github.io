myAppModule.controller('BranchController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    GetDataServices.getBranchList().then(function (response) {
        $scope.BranchList = response.data;
    })

    PermissionServices.BranchList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.addBranch = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Modal/Branch/AddBranch.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveBranch = function (invalid, ev, branch) {
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit Branch information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveBranch(branch).then(function (response) {
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

    $scope.updateBranchModal = function (ev, branch) {
        $scope.Branch = {};
        angular.copy(branch,$scope.Branch);

        $mdDialog.show({
            templateUrl: 'Views/Modal/Branch/UpdateBranch.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updateBranch = function (invalid, ev, branch) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update Branch information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            var Branch = {
                Id: branch.BranchId,
                BranchName: branch.BranchName,
                SwiftCode: branch.SwiftCode,
                Address: branch.Address
            }

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateBranch(Branch).then(function (response) {
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