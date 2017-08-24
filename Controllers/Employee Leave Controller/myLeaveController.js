myAppModule.controller('myLeaveController', ['$scope', '$route', 'EmployeeDataServices', '$mdDialog', '$mdpTimePicker', function ($scope, $route, EmployeeDataServices, $mdDialog, $mdpTimePicker) {

    EmployeeDataServices.getLeaveDetails().then(function (response) {
        $scope.leaveDetails = response.data;
    }, function (error) {
        $scope.leaveDetails = [];
    })

    $scope.currentYear = moment().format('YYYY');

    $scope.years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    $scope.status = [{ text: 'All', value: null }, { text: 'Approve', value: true }, { text: 'Pending', value: false }];

    $scope.viewPerPage = ['10', '20', '50', '100', '200', '500', '1000'];

    $scope.ViewPerPage = 10;

    $scope.changeViewPerPage=function(viewNumber)
    {
        $scope.ViewPerPage = viewNumber;
    }

    $scope.RequestForLeave = function (ev) {

        $mdDialog.show({
            templateUrl: 'Views/Employee Leave Plan/Modal/RequestLeave.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.viewLeaveDetails = function (ev,data) {
        $scope.leaveDetail = data;
        $scope.leaveDetail.numberOfDays = moment(data.toDate).diff(moment(data.fromDate), 'days');
        $mdDialog.show({
            templateUrl: 'Views/Employee Leave Plan/Modal/ViewLeaveDetails.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        })
    }

    $scope.weekendHolyday = function (date) {
        var day = date.getDay();
        return day == 1 || day == 2 || day == 3 || day == 4 || day == 6 ;
    }

    $scope.currentTime = null;

    $scope.showTimePicker1 = function (ev) {
        $mdpTimePicker($scope.fromTime, {
            targetEvent: ev
        }).then(function (selectedDate) {
            $scope.fromTime = moment(selectedDate).format("hh:mm A");
        });;
    }

    $scope.showTimePicker2 = function (ev) {
        $mdpTimePicker($scope.toTime, {
            targetEvent: ev
        }).then(function (selectedDate) {
            $scope.toTime = moment(selectedDate).format("hh:mm A");
        });;
    }

    $scope.hide=function()
    {
        $mdDialog.hide();
    }


}])