const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
	{
		token: {
	      type: String
	    },
	    user: {
	    	type: mongoose.Schema.Types.ObjectId,
	    	ref: 'User'
	    },
	    expiryDate: {
	    	type: Date
	    }
	}, 
	{ timestamps: true }
);


refreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + 7200 //2 horas
  );

  let _token = uuidv4();

  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await _object.save();

  return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;