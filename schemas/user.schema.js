const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require("bcryptjs"); /*Utilizado para encriptar a senha*/

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
	      type: String,
	      required: [true, "Nome é obrigatório"],
	      unique: true,
	      trim: true,
	      minlength: [3, "Nome muito curto"],
	      maxlength: [35, "Nome muito longo"],
	    },
		email: {
	      type: String,
	      required: [true, "E-mail é obrigatório"],
	      unique: true,
	      trim: true,
	      lowercase: true,
	      validate: {
	        validator: validator.isEmail,
	        message: "{VALUE} não é um e-mail válido",
	      },
	    },
		password: {
	      type: String,
	      required: [true, "Senha é obrigatória"],
	      minlength: [8, "Senha deve ter pelo menos 8 caracteres"],
	      maxlength: [40, "Senha muito longa"],
	      select: false, /*Password não será retornado nas buscas ao BCD*/
	      validate: {
	        validator: (value) => {
	          //Password possui pelo menos 1 numero, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial e no minimo de 8 caracteres 
	          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value);
	        },
	        message: "Senha muito fraca"
	      }
	    },
	    emailIsConfirmed: {
			type: String,
			default: "false"
		},
		emailConfirmToken: {
			type: String,
			select: false
		},
	}, 
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;