'use strict';

app.factory('Post', function(DS, $state) {
	
	return DS.defineResource({
		name: 'posts', 
		relations: {
			belongsTo: {
				users: {
					localKey: 'author',
					localField: '_author' 
				} 
			}
		}, 
		// functionality added to the prototype of every instance
		methods: {
			go: function (){
				$state.go('post', {
					postId: this._id, 
					authorId: this.author
				})
			}
		}

	})

}).run(function (Post) {})


