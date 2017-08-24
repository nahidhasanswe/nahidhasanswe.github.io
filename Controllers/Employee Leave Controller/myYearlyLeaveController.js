myAppModule.controller('myYearlyLeaveController', ['$scope', '$route', 'EmployeeDataServices', '$filter', '$mdDialog', 'Notification', '$timeout', function ($scope, $route, EmployeeDataServices, $filter, $mdDialog, Notification, $timeout) {
    

    $scope.monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    $scope.yearlyPlan = [{ "MonthName": "JAN", "Day": [1, 2] }, { "MonthName": "FEB", "Day": [14, 15] }, { "MonthName": "MAR", "Day": [11, 12] }, { "MonthName": "APR", "Day": [6, 8] }, { "MonthName": "MAY", "Day": [1] }, { "MonthName": "JUN", "Day": [9, 10, 11] }, { "MonthName": "JUL", "Day": [7, 8] }, { "MonthName": "AUG", "Day": [5, 6] }, { "MonthName": "SEP", "Day": [] }, { "MonthName": "OCT", "Day": [4, 8, 10] }, { "MonthName": "NOV", "Day": [17, 29] }, { "MonthName": "DEC", "Day": [25, 27] }]
    


    $scope.result = false;
    $scope.showProgress = false;

    $scope.SearchYearlyPlan = function (year) {
        if (year != null) {
            $scope.showProgress = true;
            $scope.result = false;
            $timeout(function () {
                $scope.showProgress = false;
                $scope.result = true;
            }, 3000);
        }
            
    }

    $scope.highlightDays = [
    { date: moment().date(3).valueOf(), selectable: false},
    { date: moment().date(5).valueOf(), selectable: false,},
    { date: moment().date(11).valueOf(), selectable: false },
    { date: moment().date(1).valueOf(), css: 'birthday', selectable: true },
    { date: moment().date(4).valueOf(), css: 'birthday', selectable: false, },
    { date: moment().date(6).valueOf(), css: 'birthday', selectable: false },

    ];

    $scope.OpenCalender = function (year, ev) {

        if (year == null) {

            Notification.error('Year is not select')

        } else {
            $scope.selectedYearForPlan = moment(year).startOf('YEAR');
            $scope.startDateofYear = moment(year).startOf('year').format('MM/DD/YYYY');
            $scope.endDateofYear = moment(year).endOf('year').format('MM/DD/YYYY');

            $mdDialog.show({
                templateUrl: 'Views/Employee Leave Plan/Modal/giveYearlyPlan.html',
                //parent: angular.element(document.body),
                targetEvent: ev,
                multiple: true,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: false
            })
        }
    }

    $scope.arrangeYearlyDate = [];
    $scope.isSelectYearlyPlan = false;


    $scope.SubmitYearlyPlan = function (selectedDays) {

        $mdDialog.hide();
        $scope.arrangeYearlyDate = [];
        angular.forEach($scope.monthNames, function (nameOfMonth, key) {
            var Day = [];
            angular.forEach(selectedDays, function (eachDate, key) {
                var check = moment(eachDate, 'YYYY MMM DD');

                var month = check.format('MMM');
                var day = check.format('DD');
                if (month.toUpperCase() == nameOfMonth) {
                    Day.push(day);
                }
            })
            var singleMonthDays = { "MonthName": nameOfMonth, "Day": Day };
            $scope.arrangeYearlyDate.push(singleMonthDays);
        })
        $scope.isSelectYearlyPlan = true;
        
    }

    $scope.updateYearlyPlan = function (ev) {
        $scope.isSelectYearlyPlan = false;
        $scope.OpenCalender($scope.newSelectYear,ev);
    }

    $scope.submitFinalYearlyLeavePlan = function () {
        swal({
            title: 'Are you sure?',
            text: "You submit the yearly leave plan",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, apply it!'
        }).then(function () {
            Notification.success('Successfully submit your yearly leave plan');
            $scope.newSelectYear = null;
            $scope.isSelectYearlyPlan = false;
            $scope.daySelected = [];
        })
    }

    $scope.removeYearlyPlan = function () {
        swal({
            title: 'Are you sure?',
            text: "You submit the yearly leave plan",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            confirmButtonClass: 'md-raised md-success',
            cancelButtonClass: 'md-raised',
        }).then(function () {
            $scope.newSelectYear = null;
            Notification.warning('Yearly leave plan has removed');
            $scope.isSelectYearlyPlan = false;
            $scope.daySelected = [];
        })
    }

    $scope.hide = function () {
        $mdDialog.hide();
    }

}])