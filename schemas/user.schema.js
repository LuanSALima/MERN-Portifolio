const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require("bcryptjs"); /*Utilizado para encriptar a senha*/

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
	      type: String,
	      required: [true, "userschema_username_required"],
	      unique: true,
	      trim: true,
	      minlength: [3, "userschema_username_minlength"],
	      maxlength: [35, "userschema_username_maxlength"],
	    },
		email: {
	      type: String,
	      required: [true, "userschema_email_required"],
	      unique: true,
	      trim: true,
	      lowercase: true,
	      validate: {
	        validator: validator.isEmail,
	        message: "userschema_email_invalid",
	      },
	    },
		password: {
	      type: String,
	      required: [true, "userschema_password_required"],
	      minlength: [8, "userschema_password_minlength"],
	      maxlength: [40, "userschema_password_maxlength"],
	      select: false, /*Password não será retornado nas buscas ao BCD*/
	      validate: {
	        validator: (value) => {
	          //Password possui pelo menos 1 numero, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial e no minimo de 8 caracteres 
	          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value);
	        },
	        message: "userschema_password_weak"
	      }
	    },
	    role: {
	    	type: String,
			enum: ['Admin', 'User', 'Guest'],
			required: [true, 'userschema_role_required']
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