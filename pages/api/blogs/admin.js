/* 
  운영자 전용 회원들 블로그 리스트 불러오기 (삭제 목적)
*/

import Blog from '/models/Blog';
import { dbConnect, tokenValidation, adminMiddleware } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await adminMiddleware(req, res, user);

					// 비밀번호 비공개로 전환
					req.profile.password = undefined;

					if (auth) {
						await Blog.find({})
							.populate('tags', '_id name slug')
							.populate('postedBy', '_id username name')
							.sort({ createdAt: -1 })
							.select(
								'tags _id title slug excerpt postedBy createdAt updatedAt'
							)
							.exec((err, data) => {
								if (err) {
									return res
										.status(400)
										.json({ error: '블로그 리스트 불러오기 실패' });
								}
								return res.status(200).json({ data, size: data.length });
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
