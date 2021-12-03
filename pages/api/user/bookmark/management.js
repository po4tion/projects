/* 
	1. GET & PUT 북마크 관리 탭
*/

import Bookmark from '/models/Bookmark';
import Blog from '/models/Blog';
import { dbConnect, authMiddleware, tokenValidation } from '/lib';

export default function handler(req, res) {
	return new Promise(async resolve => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { email } = req.query;

					await Bookmark.findOne({ email }).exec(async (err, docs) => {
						if (err || !docs) {
							return res.status(400).json({ error: err });
						}

						const data = await Blog.find({ slug: { $in: docs.list } })
							.select('title body')
							.lean();

						return res.json(data);
					});
				} catch (error) {
					return res.status(400).json({ error: '에러' });
				}
				break;

			case 'PUT':
				try {
					const { email, slug } = req.body;

					await Bookmark.findOneAndUpdate(
						{ email },
						{ $pull: { list: slug } },
						{ new: true }
					).exec((err, docs) => {
						if (err) {
							return res.status(400).json({ error: err });
						}

						return res.status(200).json({ success: '북마크 제거 완료' });
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
