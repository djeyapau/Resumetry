	var myApp1 = angular.module('myApp1', []);
	myApp1.controller('AppCtrl1', ['$scope', '$http', function ($scope, $http) {
				console.log("Hello World from controller1");

				var refresh = function () {

					$http.get('/login').success(function (response) {
						console.log("controller1 - get - refresh");
						$scope.login = response;
						$scope.user = "";
					});

				};
				refresh();
				$scope.login = function () {
					console.log($scope.user);

					$http.post('/login', $scope.user).success(function (response) {
						console.log(response);
						console.log("login - post");
						
						refresh();
					});
				};
			}
		]);