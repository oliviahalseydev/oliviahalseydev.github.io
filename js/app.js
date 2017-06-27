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
    $http.get('http://oliviahalsey.me/assets/sitetext/store.json')
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
