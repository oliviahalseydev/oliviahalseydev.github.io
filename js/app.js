var OHWebsiteApp = angular.module('OHWebsiteApp', ['ui.router']);

OHWebsiteApp.directive('audios', function ($sce) {
    return {
        restrict: 'A',
        scope: { code: '=' },
        replace: true,
        template: '<audio ng-src="{{url}}" controls></audio>',
        link: function (scope) {
            scope.$watch('code', function (newVal, oldVal) {
                if (newVal !== undefined) {
                    scope.url = $sce.trustAsResourceUrl("/assets/demos/" + newVal);
                }
            });
        }
    };
});

OHWebsiteApp.controller('OHWebsiteController', function ($scope, $http) {
    $(document).ready(function () {
        getData();
    });
    function getData() {
        $http.get('http://oliviahalseydev.github.io/assets/sitetext/store.json')
        //$http.get('http://localhost:60269/assets/sitetext/store.json')
        .success(function (result) {
            $scope.albums = []
            for (var key in result.albums) {
                $scope.albums.push(result.albums[key]);
            }
        })
        .error(function (data, status, headers, config) {
            alert("Error while loading the store. Please check back later. Sorry for any inconvenience.");
        });
    }

    $http.get('http://oliviahalseydev.github.io/assets/sitetext/olivia.json')
    //$http.get('http://localhost:60269/assets/sitetext/olivia.json')
    .success(function (result) {
        $scope.profile_squares = []
        for (var key in result.profile_squares) {
            $scope.profile_squares.push(result.profile_squares[key]);
        }
    })
    .error(function (data, status, headers, config) {
        alert("Error while loading the profile. Please check back later. Sorry for any inconvenience.");
    });
});



OHWebsiteApp.config(function($stateProvider, $urlRouterProvider) {

	// default route
	$urlRouterProvider.otherwise("/home");
	var header = {
	    templateUrl: 'src/header.html',
		controller: function($scope) {}

	}
	var footer = {
		templateUrl: 'src/footer.html',
		controller: function($scope) {}

	}
    // ui router states
    $stateProvider
        .state('home', {
            url: "/home",
            views: {
                header: header,
                content: {
                    templateUrl: 'src/home.html',
                    controller: function($scope) {}
                },
                footer: footer
            }
        })
        .state('olivia', {
            url: "/olivia",
            views: {
                header: header,
                content: {
                    templateUrl: 'src/olivia.html',
                    controller: function($scope) {}
                },
                footer: footer
            }
        })
        .state('contact', {
            url: "/contact",
            views: {
                header: header,
                content: {
                    templateUrl: 'src/contact.html',
                    controller: function($scope) {}
                },
                footer: footer
            }
        })
        .state('store', {
            url: "/store",
            views: {
                header: header,
                content: {
                    templateUrl: 'src/store.html',
                    controller: function($scope) {}
                },
                footer: footer
            }
        });

});

function sendNewMessage() {
    var reason = document.getElementById('reason-text').value;

    switch (reason) {
        case "contact":
            var link = "mailto:austin.klein.se@gmail.com"
                 + "?subject=" + escape(document.getElementById('name-text').value + " wanted to contact management")
                 + "&body=" + escape("Name: " + document.getElementById('name-text').value
                    + "\nEmail: " + document.getElementById('email-text').value
                    + "\nReason: Booking Request"
                    + "\nMessage: " + document.getElementById('message-text').value)
            ;
            window.location.href = link;
            break;
        case "issue":
            var link = "mailto:austin.klein.se@gmail.com"
                 + "?subject=" + escape(document.getElementById('name-text').value + " had an issue with their purchase")
                 + "&body=" + escape("Name: " + document.getElementById('name-text').value
                    + "\nEmail: " + document.getElementById('email-text').value
                    + "\nReason: Issue with Purchase"
                    + "\nMessage: " + document.getElementById('message-text').value)
            ;
            window.location.href = link;
            break;
        default:
            var link = "mailto:austin.klein.se@gmail.com"
                 + "?subject=" + escape(document.getElementById('name-text').value + " is contacting you for some other reason")
                 + "&body=" + escape("Name: " + document.getElementById('name-text').value
                    + "\n\nEmail: " + document.getElementById('email-text').value
                    + "\n\nReason: Other"
                    + "\n\nMessage: " + document.getElementById('message-text').value)
            ;
            window.location.href = link;
    }
    window.setTimeout(function () { location.href = "http://oliviahalsey.com/#/home" }, 500);
}
