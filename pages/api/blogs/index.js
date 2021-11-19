/* 
  블로그 리스트 불러오기
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
						/* 여기서 오류시 populate categories, tags 확인
						오류 발생 이유. populate 즉 참조를 위해서는 참조가
						들어간 mongoose를 최소 한번은 실행해야 한다
						그래서 blog를 create하고 read하면 오류가 안생김 */
						await Blog.find({})
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
