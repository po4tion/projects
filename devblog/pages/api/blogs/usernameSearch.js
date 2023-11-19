/* 
  검색된 블로그 불러오기
*/

import Blog from '/models/Blog';
import User from '/models/User';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { username } = req.query;

					if (username) {
						await User.find({ username })
							.select('id')
							.lean()
							.exec(async (err, docs) => {
								if (!docs.length) {
									return res.json(docs);
								} else {
									await Blog.find({ postedBy: docs[0]._id })
										.select('title excerpt createdAt postedBy slug ')
										.populate('postedBy', 'username ')
										.sort({ createdAt: -1 })
										.lean()
										.exec((err, docs) => {
											if (err) {
												return res.status(400).json({ error: err });
											}

											return res.json(docs);
										});
								}
							});
					}
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
