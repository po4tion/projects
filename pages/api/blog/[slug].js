/* 
  1. 해당 블로그의 정보를 가져온다
	2. 해당 블로그를 정보를 제거한다
  3. 해당 블로그를 업데이트 한다
*/

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

					await Blog.findOne({ slug: slug.toLowerCase() })
						.populate('categories', '_id name slug')
						.populate('tags', '_id name slug')
						.populate('postedBy', '_id username name')
						.select(
							'categories tags _id title slug body sTitle sDesc postedBy createdAt updatedAt'
						)
						.exec((err, data) => {
							if (err) {
								return res.status(400).json({
									error: '해당 블로그를 불러오지 못했습니다.',
								});
							}

							return res.status(200).json({ data });
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
