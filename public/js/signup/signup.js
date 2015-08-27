'use strict';

app.config(function($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  })
})

app.controller('SignupCtrl', function($scope, User, $stateParams, $state) {

  $scope.signup = {
    password: '', 
    username: ''
  }

  $scope.sendSignup = function(){
    return User.create($scope.signup)
    .then(function(user){
      console.log('user: ', user)
      $state.go('create', {
        userId: user._id
      });
    })
  }
})