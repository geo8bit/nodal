function dbConnection(mongoString) {
	this.mongoString = mongoString; 
	this.mongoose    = require('mongoose');
} 

dbConnection.prototype.getMongoose = function() {
	return this.mongoose;
};

dbConnection.prototype.init = function() {
	this.mongoose.connect(this.mongoString);
	var that = this; 
	this.Schema = this.mongoose.Schema;
	this.db     = this.mongoose.connection;
	this.db.on('error', console.error.bind(console, 'connection error:'));
	this.db.once('open', function callback () {
		console.log('mongoose Connected');
	});
};

exports.dbConnection = dbConnection;

