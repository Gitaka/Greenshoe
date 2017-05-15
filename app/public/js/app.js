
(function() {

	var app = angular.module('GreenShoe', [
		'ngRoute',
		'ngStorage',
  
	]);

	app.config(['$routeProvider','$httpProvider', function ($routeProvider,$httpProvider) {
		$routeProvider
            .when('/', {
      				templateUrl: '../views/main.html'
      			})
                 .when('/signin', {
      				templateUrl: '../views/signin.html'
      			})
      			.when('/signup', {
      				templateUrl: '../views/register.html'
      			})
           .when('/user', {
                templateUrl: '../views/user.html'
            })
            .when('/customer',{
                templateUrl: '../views/customer.html'
            })
           .when('/customers',{
                templateUrl: '../views/customers.html'
           })
           .when('/debtReport',{
                templateUrl: '../views/debtReport.html'
           })
			.otherwise({
				templateUrl: '../views/404.html'
			});

/*
when ever we need to make a request to the server on the protected routes,the token needs to be out in the authorization header.
angularJS interceptors are used to hijack the request and insert the bearer token to the authorization header field

*/
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);



	}]);

	
})();