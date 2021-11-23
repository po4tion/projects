import mongoose from 'mongoose';

const UtagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 32,
			index: true,
			unique: true,
		},
		slug: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			maxLength: 32,
			index: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Utag || mongoose.model('Utag', UtagSchema);
