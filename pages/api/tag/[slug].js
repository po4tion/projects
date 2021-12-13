/* 
  1. 해당 태그의 정보를 가져온다
  2. 해당 태그의 정보를 제거한다
*/

import Utag from '/models/Utag';
import Blog from '/models/Blog';
import {
	dbConnect,
	errorHandler,
	adminMiddleware,
	tokenValidation,
} from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { slug } = req.query;

					await Utag.findOne({ slug: slug.toLowerCase() }).exec(
						async (err, tag) => {
							if (err) {
								return res.status(400).json({
									error: errorHandler(err),
								});
							}

							await Blog.find({ tags: tag })
								.populate('tags', '_id name slug')
								.populate('postedBy', '_id username name')
								.sort({ createdAt: -1 })
								.select(
									'tags _id title slug excerpt postedBy createdAt updatedAt'
								)
								.exec((err, data) => {
									if (err) {
										return res.status(400).json({
											error: '해당 태그와 연관된 블로그를 불러오지 못했습니다.',
										});
									}

									return res.status(200).json({ tag, blogs: data });
								});
						}
					);
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
