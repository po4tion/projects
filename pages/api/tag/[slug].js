/* 
  1. 해당 태그의 정보를 가져온다
  2. 해당 태그의 정보를 제거한다
*/

import Tag from '/models/Tag';
import {
	dbConnect,
	errorHandler,
	adminMiddleware,
	tokenValidation,
} from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { slug } = req.query;

					await Tag.findOne({ slug: slug.toLowerCase() }).exec((err, tag) => {
						if (err) {
							return res.status(400).json({
								error: errorHandler(err),
							});
						}

						return res.status(201).json(tag);
					});
				} catch (error) {
					return res.status(400).json({ error: '에러' });
				}
				break;
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

						await Tag.findOneAndRemove({ slug: slug.toLowerCase() }).exec(
							(err, data) => {
								if (err) {
									return res.status(400).json({
										error: errorHandler(err),
									});
								}

								return res
									.status(200)
									.json({ success: '태그가 성공적으로 지워졌습니다' });
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
