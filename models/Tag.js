import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 32,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Tag || mongoose.model('Tag', TagSchema);
