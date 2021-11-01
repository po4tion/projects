import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
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

module.exports =
	mongoose.models.Category || mongoose.model('Category', CategorySchema);
