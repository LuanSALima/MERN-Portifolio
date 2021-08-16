const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const i18next = require('./backend/middlewares/i18n.middleware');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(i18next.middleware());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false, //Ao utilizar o método findByIdAndUpdate e findByIdAndDelete gerava um warning, isso remove o warning
}).catch(err => console.log('Erro ao Conectar ao MongoDB: ' + err));

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./backend/routes/users.js');
app.use('/api/users', usersRouter);

const authRouter = require('./backend/routes/auth.js');
app.use('/api/auth', authRouter);

if (process.env.NODE_ENV === 'production') {

	/*https://dev.to/hawacodes/deploying-a-mern-app-with-heroku-3km7*/
    // Accessing the path module
	const path = require("path");

	// import the client build folder to the server.
	app.use(express.static(path.resolve(__dirname, "./frontend/build")));

	// ensure that the routes defined with React Router are working once the application has been deployed
	app.get("*", function (request, response) {
	  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});