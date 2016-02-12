app.factory('Post', function ($http, $q, $timeout)
{
	var factory = {
	
	posts : false,
	getPosts : function()
	{
		var deferred = $q.defer();
		
		if(factory.posts !==false) //permet de charger une seule fois le json
		{
			deferred.resolve(factory.posts);
		}
		else
		{
			$http.get('posts.json')
			.success(function(data, status){
				factory.posts = data;
				$timeout(function(){
					deferred.resolve(factory.posts);
				},2000)
				
			}).error(function(data, status){
				deferred.reject('Impossible de récupérer les articles');
			});
		
		}
			return deferred.promise;
			//return factory.posts;
	},
	getPost : function(id)
	{
		var deferred = $q.defer();
		var post={};
		var posts = factory.getPosts().then(function(posts)
		{
			angular.forEach(factory.posts, function(value, key){
				if(value.id == id){
					post = value;
				}
				//this.push(key +': '+value);
			});
			deferred.resolve(post);
		}, function(msg)
		{
			deferred.reject(msg);
		})
		//return factory.posts[0];
		//return post;
		return deferred.promise;
	},
	add : function(comment){
		var deferred = $q.defer();
		deferred.resolve();
		return deferred.promise;
	}
}; // end var factory
   return factory;

});