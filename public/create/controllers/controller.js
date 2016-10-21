	var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

	var refresh=function() {
	
	$http.get('/resume').success(function(response) {
		console.log("I got the resume I wanted");
		$scope.user=response;
		$scope.user="";
	});
	
	};
	
	refresh();
	
				$scope.addResume=function(){
		console.log($scope.user);
		$http.post('/resume',$scope.user).success(function(response){
		console.log(response);
		refresh();
		});
	};
	
		$scope.remove=function(id) {
			console.log(id);
			$http.delete('/resume/' + id).success(function(response){
			refresh();
			});
		};
		
		$scope.edit=function(id) {
			console.log(id);
			$http.get('/resume/' + id).success(function(response) {
				$scope.user=response;
			});
		};
		
		$scope.update=function(){
			console.log($scope.user._id);
			$http.put('/resume/' + $scope.user._id, $scope.user).success(function(response){
				refresh();
			});
		};
		
		$scope.deselect=function() {
			$scope.user="";
		}
		
}]);