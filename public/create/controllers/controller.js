	var myApp = angular.module('myApp', []);
	myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
				console.log("Hello World from controller");

				var today = new Date();
				var minAge = 15;
				$scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

				var refresh = function () {

					$http.get('/resume').success(function (response) {
						console.log("controller - get - refresh");
						$scope.resume = response;
						$scope.user = "";
					});

				};
				refresh();
				$scope.addResume = function () {
					console.log($scope.user);

					$http.post('/resume', $scope.user).success(function (response) {
						console.log(response);
						console.log("addResume - post");
						//refresh();
					});
				};
				
				$scope.logging = function () {
					console.log($scope.logg);

					$http.post('/logging', $scope.logg).success(function (response) {
						console.log(response);
						console.log("logging - post");
						
						// if($scope.resultemail == "true" && $scope.resultpassword == "true") {
							// console.log("You have been checked!");
						// }
						// else {
							// console.log("Wrong credentials");
						// }
					});
					$http.delete('/logging', $scope.logg).success(function (response) {
						console.log(response);
						console.log("deleted the logging collection");
						});
				};

				$scope.remove = function (id) {
					console.log(id);
					$http.delete ('/resume/' + id).success(function (response) {
						refresh();
					});
				};

				$scope.edit = function (id) {
					console.log(id);
					$http.get('/resume/' + id).success(function (response) {
						$scope.user = response;
					});
				};

				$scope.update = function () {
					console.log($scope.user._id);
					$http.put('/resume/' + $scope.user._id, $scope.user).success(function (response) {
						refresh();
					});
				};

				$scope.deselect = function () {
					$scope.user = "";
				}

			}
		]);