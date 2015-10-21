'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/main.html',
		controller: 'MainController',
		resolve: {
			users: function(User){
				// GET --> /api/users
				return User.findAll()
				// under the hood, js-data maps over this array, instantiates 
				// each object as an instance of the User class, and injects the users
				// in the cache : adding them to an array : 
				// .then(function(userObjects){
				// 		return userObjects.map(function(obj){
				// 			var user = User.createInstance(obj)
				// 			return User.inject(user)
				// 		})
				// })
			},
			// injecting the users resolve-service into posts
			// to avoid race conditions 
			posts: function(Post, users) {
				// GET --> /api/posts
				return Post.findAll({}, {bypassCache: true})
			}
		}
	})
})

app.controller('MainController', function($scope, posts, User) {

	$scope.allPosts = posts;

	console.log('posts: ', posts)

	//synchronous retrieval of data from the in-memory cache
	// creating a new reference to this data 		
	var users = User.getAll()

	console.log('users: ', users)

	// remove all of the user objects in the cache from the cache
	User.ejectAll()

	// logs an empty array 
	console.log('users shouldnt be here: ', User.getAll())

	//inject the reference to the user objects back in the cache
	// think of js-data `push`-ing this data into its array 
	User.inject(users)

	// synchronously re-retrieve the data 
	console.log('users after inject: ',  User.getAll())


 })


