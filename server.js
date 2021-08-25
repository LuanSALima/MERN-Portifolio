const app = require('./app');
const database = require('./database');

const port = process.env.PORT || 8080;
const databaseName = process.env.ATLAS_DATABASE;

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

if(database.connect(databaseName)){
	console.log("MongoDB database connection established successfully");
} else {
	console.log('Erro ao Conectar ao MongoDB');
}