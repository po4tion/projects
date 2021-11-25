/* 
  1. 운영자가 해당 블로그를 삭제한다
*/

import Blog from '/models/Blog';
import { dbConnect, adminMiddleware, tokenValidation } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'DELETE':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await adminMiddleware(req, res, user);

					req.profile.password = undefined;

					if (auth) {
						const { slug } = req.query;

						Blog.findOneAndRemove({ slug: slug.toLowerCase() }).exec(
							(err, data) => {
								if (err) {
									return res.status(400).json({
										error: '해당 블로그 삭제를 실패했습니다',
									});
								}

								return res
									.status(200)
									.json({ success: '해당 블로그를 삭제했습니다' });
							}
						);
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
