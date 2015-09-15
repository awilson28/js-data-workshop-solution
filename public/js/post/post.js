'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl', 
		resolve: {
			users: function(User){
				return User.findAll()
			}
		}
	})
});

app.controller('PostCtrl', function($scope, $stateParams, Post, $state, users) {

	Post.find($stateParams.postId)
		.then(function(post) {
			$scope.thisPost = post;
		})

	$scope.delete = function() {
		Post.destroy($stateParams.postId)
		.then(function(){
			alert('Post deleted!') 
			$state.go('main')
		})
	}

})