myAppModule.controller('loginController', ['$scope', '$location', 'EmployeeDataServices', '$filter', '$mdDialog', 'Notification', '$window', 'authService', function ($scope, $location, EmployeeDataServices, $filter, $mdDialog, Notification, $window, authService) {

    $scope.OpenLoginForm = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Account View/loginModal.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: false
        })
    }

    $scope.userId = null;
    $scope.isAuthenticate = false;

    $scope.initial = function () {
        $scope.button = true;
        $scope.buttonText = 'SIGN IN';
        $scope.chnagebuttonText = 'CHANGE PASSWORD';
    }

    $scope.initial();


    $scope.identifyAuth = function () {
        var data = authService.getAuthInfo();
        if (data) {
            $scope.userId = data.userId;
            $scope.isAuthenticate = data.isAuth;
        }

        if (!$scope.isAuthenticate) {
            $location.path('/login');
        }
    }

    $scope.identifyAuth();

    $scope.hide = function () {
        $mdDialog.hide();
    }


    $scope.SignIn = function (invalid, authContext) {
        if (invalid) {
            Notification.error('Please provide Employee Id and Password')
        } else {
            $scope.button = false;
            $scope.buttonText = 'SINGING..';
            var returnUrl = $location.search().returnTo;
            authService.login(authContext).then(function (response) {
                $scope.initial();
                $mdDialog.hide();
                if (returnUrl != null) {
                    $window.location.reload();
                    $location.path(returnUrl && returnUrl || "/");
                    $location.search({});
                }
                else {
                    $window.location.reload();
                    $location.path('/dashboard');
                }
            }, function (error) {
                $scope.initial();
                Notification.error(error.error_description);
            })
        }
    }

    $scope.SignOut = function () {
        authService.logOut();
        $location.path("/login")
        $scope.userId = null;
        $scope.isAuthenticate = false;
        
    }

    $scope.ChangePasswordModal = function (ev) {
        $mdDialog.show({
            templateUrl: 'Views/Account View/ChangePassword.html',
            //parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: false
        })
    }

    $scope.ChangePassword = function (invalid,data) {
        if (invalid) {
            Notification.error('Please provide proper information')
        } else {
            $scope.button = false;
            $scope.chnagebuttonText = 'CHANGING..';
            var returnUrl = $location.search().returnTo;
            authService.changePassword(data).then(function (response) {
                $scope.initial();
                $mdDialog.hide();
                Notification.success(response.data);
            }, function (error) {
                $scope.initial();
                Notification.error(error.error_description);
            })
        }
    }
}])