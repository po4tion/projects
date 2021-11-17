/* 
  해당 유저가 작성한 포스트를 불러온다
*/

import User from '/models/User';
import Blog from '/models/Blog';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { username } = req.query;

					await User.findOne({ username })
						.select('-photo -password')
						.exec(async (err, user) => {
							if (err || !user) {
								return res
									.status(400)
									.json({ error: '유저의 정보를 찾지 못했습니다' });
							}

							await Blog.find({ postedBy: user._id })
								.populate('categories', '_id name slug')
								.populate('tags', '_id name slug')
								.populate('postedBy', '_id username name')
								.sort({ createdAt: -1 })
								.select(
									'categories tags _id title slug excerpt postedBy createdAt updatedAt'
								)
								.exec((err, blogs) => {
									if (err) {
										return res
											.status(400)
											.json({ error: '유저의 포스트를 찾을 수 없습니다' });
									}

									return res.status(200).json({ user, blogs });
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
