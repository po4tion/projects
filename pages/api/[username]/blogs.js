/* 
  유저의 블로그 관리 리스트 불러오기
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
					await User.findOne({ username: req.query.username }).exec(
						async (err, user) => {
							if (err) {
								return res.status(400).json({
									error: '해당 유저를 찾을 수 없습니다',
								});
							}
							await Blog.find({ postedBy: user._id })
								.populate('categories', '_id name slug')
								.populate('tags', '_id name slug')
								.populate('postedBy', '_id username name')
								.sort({ createdAt: -1 })
								.select(
									'categories tags _id title slug excerpt postedBy createdAt updatedAt'
								)
								.exec((err, data) => {
									if (err) {
										return res
											.status(400)
											.json({ error: '블로그 리스트 불러오기 실패' });
									}
									return res.status(200).json({ data });
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
