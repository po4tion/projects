/* 
  블로그 리스트 불러오기
*/

import Blog from '/models/Blog';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { limit, skip } = req.body;
					const limitPage = parseInt(limit);
					const skipPage = parseInt(skip);

					await Blog.find({})
						.populate('postedBy', '_id username name')
						.sort({ createdAt: -1 })
						.skip(skipPage)
						.limit(limitPage)
						.select('_id title slug excerpt postedBy createdAt updatedAt')
						.exec((err, blogs) => {
							if (err) {
								return res
									.status(400)
									.json({ error: '블로그 리스트 불러오기 실패' });
							}

							return res.status(200).json({ blogs, size: blogs.length });
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
