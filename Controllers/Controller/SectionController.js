myAppModule.controller('SectionController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {
    GetDataServices.getSectionList().then(function (response) {
        $scope.SectionList = response.data;
    })

    GetDataServices.getDepartmentList().then(function (response) {
        $scope.DepartmentList = response.data;
    })

    PermissionServices.SectionList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.addSection = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Modal/Section/AddSection.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveSection = function (invalid, ev, section) {
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit Section information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveSection(section).then(function (response) {
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

    $scope.updateSectionModal = function (ev, section) {
        $scope.Section = {};
        angular.copy(section, $scope.Section);

        $mdDialog.show({
            templateUrl: 'Views/Modal/Section/UpdateSection.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updateSection = function (invalid, ev, section) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update Section information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            var Sec = {
                Id: section.SectionId,
                DepartmentId: section.DepartmentId,
                SectionName: section.SectionName
            }

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateSection(Sec).then(function (response) {
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