const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
	.catch(err => console.log('Erro ao Conectar ao MongoDB: ' + err));

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users.js');
app.use('/api/users', usersRouter);

const authRouter = require('./routes/auth.js');
app.use('/api/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});