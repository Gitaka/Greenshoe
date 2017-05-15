angular.module('GreenShoe')
      .controller('HomeController',['$route','$rootScope','$scope','$location','$localStorage','Main',function($route,$rootScope,$scope,$location,$localStorage,Main){
   
               $scope.signIn = function () {
                    var formData = {
		                username: $scope.username,
		                password: $scope.password
                      }
                     
                //call the signin method of angular service, to aauthenticate user
		            Main.signin(formData, function(res) {
		                if (res.type == false) {
		                    
		                    console.log(res);   
		                } else {

		                   if(res.error == true){
		                  	$scope.errMessage = res.message;
		                  }else{
		                  	//if user is authenticated, store the token in local storage
		                     $localStorage.token = res.token;

		                     $location.path('user');//redirect to users page
		                  }
		                  console.log(res);

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
                    
                     //console.log(formData);
		            Main.save(formData, function(res) {
		                if (res.type == false) {
		                    alert(res.data)
		                } else {
		                   
		                   $location.path('signin');   
		                   console.log(res); 
		                }
		            }, function() {
		                $rootScope.error = 'Failed to signup';
		            });
 
	            };


			         $scope.logout = function() {
				            Main.logout(function() {

				            	console.log("logged out");
				                
				                window.location.href = "/#/signin";

				            }, function() {
				                alert("Failed to logout!");
				            });
				         };

                    $scope.token = $localStorage.token;


      }])
       
     .controller('UserController',['$rootScope','$scope','$location','Main',function($rootScope,$scope,$location,Main){
     	Main.user(function(res){
     		$scope.myDetails = res;
     		var role;
     		if(res.data.role == 'roleA'){
                role = false;
            
     		}else if(res.data.role == 'roleB'){
     			role = true;
     			
     		}
     		console.log(res.data);
     		$rootScope.accessPriviledge = role;
          

     	},function(){
     		$rootScope.error = 'Failed to fetch details';
     	});


			$scope.logout = function() {
				Main.logout(function() {

				    console.log("logged out");
				                
				       window.location.href = "/#/signin";

				     }, function() {
				         alert("Failed to logout!");
				      });
		    };    	


   

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