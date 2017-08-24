myAppModule.run(function ($rootScope, $location, authService) {
    function getPath(route) {
        if (!!route && typeof (route.originalPath) === "string")
            return "'" + route.originalPath + "'";
        return "[unknown route, using otherwise]";
    }

    $rootScope.$on("$routeChangeStart", function (evt, to, from) {
        if (to.authorize === true) {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver) {
                to.resolve.authorizationResolver = function (authService) {
                    return authService.IdentifyAuth();

                };
            }
        }

    });

    $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
        $location.path("/login").search("returnTo", to.originalPath);
        
    });

    // NOT needed in authorization / logging purposes only
    $rootScope.$on("$routeChangeSuccess", function (evt, to, from) {

    });
});