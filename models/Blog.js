import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 160,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		body: {
			type: {},
			required: true,
			min: 10,
			max: 2000000,
		},
		excerpt: {
			type: String,
			max: 1000,
		},
		sTitle: {
			type: String,
		},
		sDesc: {
			type: String,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		categories: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		],
		tags: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
