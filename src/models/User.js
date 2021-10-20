import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
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

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
