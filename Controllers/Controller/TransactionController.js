myAppModule.controller('TransactionController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    GetDataServices.getTransactionListList().then(function (response) {
        $scope.TransactionList = response.data;
    });

    GetDataServices.getCustomerList().then(function (response) {
        $scope.CustomerList = response.data;
    });

    PermissionServices.TransactionList().then(function (response) {

    }, function (error) {
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    $scope.hide = function () {
        $mdDialog.hide();
    }

    $scope.viewTransaction = function (ev,transaction) {
        $scope.Transaction = transaction;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Transaction/ViewTransaction.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.addTransaction = function (ev) {
        $scope.Customer = $scope.loadCustomer();
        $scope.seletedItem = null;
        $scope.searchText = null;
        $scope.querySearch = $scope.querySearch;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Transaction/SaveTransaction.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.saveTransaction = function (invalid, transaction, ev) {
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit transaction information??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            transaction.AccNo = $scope.seletedItem.value;

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveTransaction(transaction).then(function (response) {
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


    // autocomplete Customer
    $scope.querySearch = function (query) {
        var results = query ? $scope.Customer.filter($scope.createFilterFor(query)) : $scope.Customer;
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
    }

    $scope.loadCustomer = function () {
        return $scope.CustomerList.map(function (customer) {
            return {
                value: customer.AccountNo,
                Name: customer.AccHolderName.toLowerCase(),
                display: customer.AccHolderName
            }
        })
    }

    $scope.createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(customer) {
            return (customer.value.indexOf(lowercaseQuery) === 0);
        };

    }
}])