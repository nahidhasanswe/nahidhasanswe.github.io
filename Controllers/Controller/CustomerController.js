myAppModule.controller('CustomerController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {
    GetDataServices.getCustomerList().then(function (response) {
        $scope.CustomerList = response.data;
    })

    GetDataServices.getBranchList().then(function (response) {
        $scope.BranchList = response.data;
    })

    PermissionServices.CustomerList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.hide = function () {
        $mdDialog.hide();
    }

    $scope.viewCustomer = function (ev,customer) {
        $scope.Customer = customer;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Customer/ViewCustomer.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.AddCustomer = function (ev) {
        $scope.Branch = $scope.loadBranch();
        $scope.seletedItem = null;
        $scope.searchText = null;
        $scope.querySearch = $scope.querySearch;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Customer/AddCustomer.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveCustomer = function (invalid, customer,ev) {
        if(invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit customer information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            customer.BranchId = $scope.seletedItem.value;

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveCustomer(customer).then(function (response) {
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

    $scope.updateCustomerModal = function (ev, customer) {
        $scope.Customer = {};
        angular.copy(customer, $scope.Customer);
        $scope.Branch = $scope.loadBranch();
        if (customer.BranchId != null) {
            $scope.seletedItem = { value: customer.BranchId, Name: customer.Branch.toLowerCase(), display: customer.Branch };
            $scope.searchText = customer.Branch;
        } else {
            $scope.seletedItem = null;
            $scope.searchText = null;
        }
        $scope.querySearch = $scope.querySearch;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Customer/UpdateCustomer.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.updateCustomer = function (invalid, customer, ev) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update customer information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            customer.BranchId = $scope.seletedItem.value;

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateCustomer(customer).then(function (response) {
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

    //Auto complete branch
    $scope.querySearch = function (query) {
        var results = query ? $scope.Branch.filter($scope.createFilterFor(query)) : $scope.Branch;
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
    }

    $scope.loadBranch = function () {
        return $scope.BranchList.map(function (branch) {
            return {
                value: branch.BranchId,
                Name: branch.BranchName.toLowerCase(),
                display: branch.BranchName
            }
        })
    }

    $scope.createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(branch) {
            return (branch.Name.indexOf(lowercaseQuery) === 0);
        };

    }
}])
