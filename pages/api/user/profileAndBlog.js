/* 
	유저의 정보와 해당 유저의 블로그를 가져온다
*/

import Blog from '/models/Blog';
import { tokenValidation, authMiddleware } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		switch (method) {
			case 'GET':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await authMiddleware(req, res, user);

					req.profile.password = undefined;
					req.profile.photo = undefined;

					if (auth) {
						await Blog.find({ postedBy: req.profile._id })
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
					} else {
						return res
							.status(400)
							.json({ error: '프로필 정보를 불러오지 못했습니다' });
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
