//Add CT:Blog

var ctBlog = function( app, mongooze ) {
	
	Schema = mongooze.Schema;
	db     = mongooze.connection;


	var blogSchema = new Schema({
		title:  String,
		author: String,
		body:   String
	});
	var blog = db.model('blog', blogSchema);
	
	//
	//INDEX
	//
	app.get('/api/blog', function (req, res){
		var query = blog.find().select('id');
		query.exec(function (err, data) {
			if (err) return handleError(err);
			res.send(data);
		});	
	});
	
	
	//
	//Create
	//
	app.post('/api/blog', function (req, res){
		var data = new blog({
			title:  req.body.title,
			author: 'Derp',
			body:   req.body.body,
		});
		data.save(function (err) {
			if (!err) {
			  return console.log("created");
			} else {
			  return console.log(err);
			}
		});
		return res.send(data);
	});
	
	//
	//Retrieve
	//
	app.get('/api/blog/:id', function (req, res){
		return blog.findById(req.params.id, function (err, data) {
		if (!err) {
		  return res.send(data);
		} else {
		  return console.log(err);
		}
	  });
	});
	
	//
	//Update
	//
	app.put('/api/products/:id', function(req, res){
		return blog.findById(req.params.id, function(err, product) {
			var data = new blog({
				title:  req.body.title,
				author: 'Derp',
				body:   req.body.body,
			});
			data.save(function (err) {
				if (!err) {
				  return console.log("created");
				} else {
				  return console.log(err);
				}
			});
			return res.send(data);
		});
	});
	
	//
	//Delete
	//
	app.delete('/api/blog/:id', function (req, res){
		return blog.findById(req.params.id, function (err, data) {
			return data.remove(function (err) {
				if (!err) {
					return res.send('');
				} else {
					console.log(err);
				}
			});
		});
	});
	
	
}
exports.ctBlog = ctBlog;

