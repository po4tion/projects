import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			maxLength: 32,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: {
			type: String,
			required: true,
		},
		about: {
			type: String,
		},
		role: {
			type: Number,
			default: 0,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		resetPasswordLink: {
			data: String,
			default: '',
		},
	},
	{ timestamps: true }
);

// bcrypt를 사용한 암호화
UserSchema.methods.setPwd = async function (pwd) {
	const hash = await bcrypt.hash(pwd, 10);

	this.password = hash;
};

// bcrypt를 사용한 비밀번호 검사
UserSchema.methods.matchPwd = async function (pwd) {
	const result = await bcrypt.compare(pwd, this.password);

	return result;
};

UserSchema.methods.generateToken = function () {
	const payload = {
		_id: this._id.toString(),
	};
	const expire = {
		expiresIn: '1d',
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET, expire);

	return token;
};

// nextjs는 usermodel을 사용할 때마다 새로운 모델을 만드므로 그것을 방지하기 위해
// global 값에 저장되어 있는 모델 값들을 먼저 불러와서 값을 확인하게 한다.
/* 
https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled
*/
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
