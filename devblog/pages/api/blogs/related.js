/* 
  연관된 블로그 불러오기
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
					const limit = req.body.limit ? parseInt(req.body.limit) : 3;
					const { _id, tags } = req.body;

					await Blog.find({
						_id: { $ne: _id },
						tags: { $in: tags },
					})
						.limit(limit)
						.populate('postedBy', '_id name username profile')
						.select('title slug excerpt postedBy createdAt updatedAt')
						.exec((err, blogs) => {
							if (err) {
								return res.status(400).json({
									error: '블로그를 찾지 못했습니다',
								});
							}
							return res.status(200).json(blogs);
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
