/* 
  모든 카테고리와 태그들 불러오기(페이징을 위해)
*/

import Blog from '/models/Blog';
import Category from '/models/Category';
import Tag from '/models/Tag';
import { dbConnect, errorHandler } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { limit, skip } = req.body;
					const limitPage = limit;
					const skipPage = skip;
					let blogs, ctg, tg;

					await Blog.find({})
						.populate('categories', '_id name slug')
						.populate('tags', '_id name slug')
						.populate('postedBy', '_id name username profile')
						.sort({ createdAt: -1 })
						.skip(skipPage)
						.limit(limitPage)
						.select(
							'categories tags _id title slug excerpt postedBy createdAt updatedAt'
						)
						.exec(async (err, data) => {
							if (err) {
								return res.status(400).json({
									error: errorHandler(err),
								});
							}

							blogs = data;

							await Category.find({}).exec(async (err, cat) => {
								if (err) {
									return res.status(400).json({
										error: errorHandler(err),
									});
								}

								ctg = cat;

								await Tag.find({}).exec(async (err, tag) => {
									if (err) {
										return res.status(400).json({
											error: errorHandler(err),
										});
									}

									tg = tag;

									return res.status(200).json({
										blogs,
										categories: ctg,
										tags: tg,
										size: blogs.length,
									});
								});
							});
						});
				} catch (error) {
					return res.status(400).json({ error: '에러' });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
