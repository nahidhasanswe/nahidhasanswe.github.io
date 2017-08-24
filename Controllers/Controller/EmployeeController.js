myAppModule.controller('EmployeeController', ['$scope', '$route', 'GetDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', 'PermissionServices', '$q', 'SaveDataServices', 'UpdateDataServices', '$location', function ($scope, $route, GetDataServices, $filter, $mdDialog, Notification, $timeout, PermissionServices, $q, SaveDataServices, UpdateDataServices, $location) {

    PermissionServices.EmployeeList().then(function (response) {

    }, function (error) {
        console.log(error);
        if (error.status == 403) {
            $location.path("/AccessDenied");
        }
    })

    GetDataServices.getEmployeeList().then(function (response) {
        $scope.EmployeeList = response.data;
    })

    GetDataServices.getDepartmentList().then(function (response) {
        $scope.DepartmentList = response.data;
    })

    GetDataServices.getCompanyList().then(function (response) {
        $scope.CompanyList = response.data;
    })

    GetDataServices.getDesignataionList().then(function (response) {
        $scope.DesignationList = response.data;
    })

    GetDataServices.getSectionList().then(function (response) {
        $scope.SectionList = response.data;
        $scope.TempSectionList = [];
        angular.copy($scope.SectionList,$scope.TempSectionList)
    })

    GetDataServices.getAccessRoleList().then(function (response) {
        $scope.AccessList = response.data;
    })

    GetDataServices.getRoleList().then(function (response) {
        $scope.RoleList = response.data;
    })

    GetDataServices.getPermissionList().then(function (response) {
        $scope.PermissionList = response.data;
    })


    $scope.ViewEmployee = function (ev,Employee) {
        $scope.Emp = Employee;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Employee/ViewEmployeeInfo.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.Employees = null;

    $scope.init = function () {
        $scope.employee = {
            EmployeeId: null,
            EmployeeNmae: null,
            Email: null,
            ReportTo: null,
            JoiningDate: null,
            DesignationId: null,
            SectionId: null,
            GroupId: null,
            Location: null,
            RoleId: null,
            AccessPermission: null
        }
    }

    $scope.AddEmployeeModal = function (ev) {

        $scope.init();
        $scope.department = null;
        $scope.selected = [];
        $scope.Employees = $scope.loadEmployee();
        $scope.seletedItem = null;
        $scope.searchText = null;
        $scope.querySearch = $scope.querySearch;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Employee/AddEmployee.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.isSetRole = true;

    $scope.saveEmployee = function (ev,invalid) {
        
        if (invalid) {
            Notification.error('Provide Proper Information');
        } else if ($scope.employee.RoleId == null) {
            Notification.error('Employee Role is not set');
        } else {
            var confirm = $mdDialog.confirm()
              .title('Are you sure to submit employee information')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

            $scope.employee.AccessPermission = $scope.selected;
            $scope.employee.ReportTo = $scope.selectedItem.value;

            $mdDialog.show(confirm).then(function () {
                SaveDataServices.saveEmployeeInfo($scope.employee).then(function (response) {
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
    };

    $scope.UpdateEmployeeModal = function (ev,employee) {
        $scope.Employee = {};
        angular.copy(employee, $scope.Employee);
        $scope.Employees = $scope.loadEmployee();
        if (employee.ReportToId != null) {
            $scope.ReportToseletedItem = { value: $scope.Employee.ReportToId, display: $scope.Employee.ReportToName.toLowerCase(), Name: $scope.Employee.ReportToName };
        } else
            $scope.ReportToseletedItem = null;
        $scope.TextSearch = employee.ReportToName;
        $scope.querySearch = $scope.querySearch;

        $mdDialog.show({
            templateUrl: 'Views/Modal/Employee/UpdateEmployee.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: false
        })
    }

    $scope.UpdateEmployee = function (ev,invalid,employee) {

        if (invalid) {
            Notification.error('Provide Proper Information');
        }else{
            var confirm = $mdDialog.confirm()
              .title('Are you sure to update employee information ??')
              .multiple(true)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');
            $scope.man = $scope.seletedItem;

            $scope.emp = {
                EmployeeId:employee.EmployeeId,
                EmployeeName:employee.EmployeeName,
                DesignationId: employee.DesignationId,
                SectionId: employee.SectionId,
                Email: employee.Email,
                JoiningDate: employee.JoiningDate,
                ReportTo: $scope.ReportToseletedItem.value,
                Location: employee.Location,
                GroupName:employee.GroupId
            };

            $mdDialog.show(confirm).then(function () {
                UpdateDataServices.updateEmployeeInfo($scope.emp).then(function (response) {
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

    $scope.AddUserAccount = function (Employee) {
        var User = {
            EmployeeId: Employee.EmployeeId,
            Email: Employee.Email
        };

        SaveDataServices.saveUserAccount(User).then(function (response) {
            Notification.success(response.data);
        }, function (error) {
            if (error.status == 403) {
                Notification.error("You don't have permission to perform the operation")
            } else {
                Notification.error(error.data.Message);
            }
        })
    }

    $scope.AddPermission = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Modal/Employee/AddRole.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: false
        })
    }
    
    $scope.selectedRole = function (role) {
        if (role == undefined || role == 'None') {
            $scope.isSetRole = true;
            $scope.selected = [];
        } else {
            $scope.selected = [];
            $scope.isSetRole = false;
            var assignPermission = $filter('filter')($scope.PermissionList, { RoleId: role });
            angular.copy(assignPermission[0].PermissionNameList, $scope.selected);
            
        }
    }


    $scope.hideRoleDialog = function () {
        $scope.selected = [];
        $scope.employee.RoleId = null;
        $scope.isSetRole = true;
        $mdDialog.hide();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }

    $scope.SubmitRole = function (invalid) {
        if (invalid)
            Notification.error('Enter Employee Role');
        else
            $mdDialog.hide();
    }


    $scope.selectDepartment = function (departmentID) {
        return $filter('filter')($scope.SectionList, { DepartmentId: departmentID });
    }



    $scope.querySearch=function(query) {
        var results = query ? $scope.Employees.filter($scope.createFilterFor(query)) : $scope.Employees;
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
    }


    $scope.loadEmployee = function () {
        return $scope.EmployeeList.map(function (employee) {
            return {
                value: employee.EmployeeId,
                display: employee.EmployeeName.toLowerCase(),
                Name:employee.EmployeeName
                  }
        })
    }

    $scope.createFilterFor=function(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(employee) {
            return (employee.display.indexOf(lowercaseQuery) === 0 || employee.value.indexOf(lowercaseQuery)===0);
        };

    }

    //$scope.items = $scope.AccessList;
    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function () {
        return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.AccessList.length);
    };

    $scope.isChecked = function () {
        return $scope.selected.length === $scope.AccessList.length;
    };

    $scope.toggleAll = function () {
        if ($scope.selected.length === $scope.AccessList.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.AccessList.slice(0);
        }
    };

}])