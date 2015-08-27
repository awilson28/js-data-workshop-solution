'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('create', {
		url: '/create/:userId',
		templateUrl: 'js/create/create.html',
		controller: 'CreateCtrl', 
		resolve: {
		/*
				add a resolve block that has an author function which 
				users $stateParams to retrieve the author object
		*/
			author: function(User, $stateParams){
				return User.find($stateParams.userId)
			}
		}
	})
})

app.controller('CreateCtrl', function($scope, Post, author, $state) {

	$scope.previewTrue = false;

	$scope.newPost = {
		title: '',
		body: '',
		name: author.username
	}

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	}

	$scope.createNewPost = function() {
		var postData = {
			title: $scope.newPost.title,
			body: $scope.newPost.body, 
			author: author._id
		}

		Post.create(postData)
		.then(function(newPost) {
			$state.go('main')
		})
	}	
}) 