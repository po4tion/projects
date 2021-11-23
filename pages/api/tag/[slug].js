/* 
  1. 해당 태그의 정보를 가져온다
  2. 해당 태그의 정보를 제거한다
*/

import Utag from '/models/Utag';
import Blog from '/models/Blog';
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

					await Utag.findOne({ slug: slug.toLowerCase() }).exec(
						async (err, tag) => {
							if (err) {
								return res.status(400).json({
									error: errorHandler(err),
								});
							}

							await Blog.find({ tags: tag })
								.populate('tags', '_id name slug')
								.populate('postedBy', '_id name')
								.sort({ createdAt: -1 })
								.select(
									'tags _id title slug excerpt postedBy createdAt updatedAt'
								)
								.exec((err, data) => {
									if (err) {
										return res.status(400).json({
											error: '해당 태그와 연관된 블로그를 불러오지 못했습니다.',
										});
									}

									return res.status(200).json({ tag, blogs: data });
								});
						}
					);
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
