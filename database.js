const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;

module.exports.connect = async (databaseName) => {
	await mongoose.connect(uri+databaseName+"?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false, //Ao utilizar o método findByIdAndUpdate e findByIdAndDelete gerava um warning, isso remove o warning
	}).catch(err => {
		return false;
	});

	const connection = mongoose.connection;
	connection.once('open', () => {
		return true;
	});
}