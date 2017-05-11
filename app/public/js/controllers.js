angular.module('GreenShoe')
      .controller('HomeController',['$route','$rootScope','$scope','$location','$localStorage','Main',function($route,$rootScope,$scope,$location,$localStorage,Main){
   
               $scope.signIn = function () {
                    var formData = {
		                username: $scope.username,
		                password: $scope.password
                      }
                     
                     //console.log(formData);

		            Main.signin(formData, function(res) {
		                if (res.type == false) {
		                    //alert(res) 
		                    console.log(res);   
		                } else {

		                   $localStorage.token = res.token;
		                    
		                   console.log(res);

		                   $location.path('user');
		                   //$route.reload();

		                }
		            }, function() {
		                $rootScope.error = 'Failed to signin';
		            })


                };

 
	           $scope.signup = function() {
		            var formData = {
		            	name:$scope.name,
		                password: $scope.password,
		           
		            }
                    
                    
		            Main.save(formData, function(res) {
		                if (res.type == false) {
		                    alert(res.data)
		                } else {
		                   //$localStorage.token = res.data.token;
		                   $location.path('signin');   
		                   console.log(res); 
		                }
		            }, function() {
		                $rootScope.error = 'Failed to signup';
		            })
 
	            };

	                /*$scope.user = function() {
			            Main.user(function(res) {
			              
			            if (res.type == false) {
		                    alert(res.data)
		                } else {
		                    $scope.myDetails = res.data;
		                    console.log("res.data"); 
		                  }
			            }, function() {
			                $rootScope.error = 'Failed to fetch details';
			            })
			        };*/

			         $scope.logout = function() {
				            Main.logout(function() {
				            	//delete $localStorage.token;

				            	console.log("logged out");
				                $location.path('/');
				                $route.reload();

				               

				            }, function() {
				                alert("Failed to logout!");
				            });
				         };

                    $scope.token = $localStorage.token;


      }])
       
     .controller('UserController',['$rootScope','$scope','$location','Main',function($rootScope,$scope,$location,Main){
     	Main.user(function(res){
     		$scope.myDetails = res;
     		console.log(res);
        

     	},function(){
     		$rootScope.error = 'Failed to fetch details';
     	});


   

     }])
       .controller('CustomerController',['$rootScope','$scope','$location','Main',function($rootScope,$scope,$location,Main){
   
	     	Main.customers(function(res){
	     		$scope.customers = res.data;
	     		console.log(res);
	     		
	     	},function(){
	     		$rootScope.error = 'Failed to get customers';
	     	});

	     $scope.search = function(){
       	     var formData = {
		           param: $scope.param,
                }
                
                 Main.searchParam(formData, function(res) {
		               if (res.type == false) {
		                    alert(res.data)
		                    console.log(res);
		                } else {

		                  $scope.customers = res.data;
		                  if(res.error == true){
		                  	$scope.message = res.message;
		                  }
		                   //window.location = "/#/customer"  
		                   //console.log(res); 
		                   
		                }
		            }, function() {
		                $rootScope.error = 'Failed to signup';
		            });

       }


     }])
       .controller('DebtReportController',['$rootScope','$scope','$location','Main',function($rootScope,$scope,$location,Main){

		     	Main.debtReport(function(res){
		     		$scope.debtReports = res.data;
		     		console.log(res);
		     	},function(){
		     		$rootScope.error = 'Failed to get debt report';
		     	});    

     }]);    