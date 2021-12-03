import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		list: [{ type: String }],
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
