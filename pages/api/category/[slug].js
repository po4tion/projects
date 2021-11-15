/* 
  1. 해당 카테고리의 정보를 가져온다
	2. 해당 카테고리의 정보를 제거한다
*/

import Category from '/models/Category';
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

					await Category.findOne({ slug: slug.toLowerCase() }).exec(
						async (err, category) => {
							if (err) {
								return res.status(400).json({
									error: errorHandler(err),
								});
							}

							await Blog.find({ categories: category })
								.populate('categories', '_id name slug')
								.populate('tags', '_id name slug')
								.populate('postedBy', '_id name')
								.sort({ createdAt: -1 })
								.select(
									'categories tags _id title slug excerpt postedBy createdAt updatedAt'
								)
								.exec((err, data) => {
									if (err) {
										return res.status(400).json({
											error:
												'해당 카테고리와 연관된 블로그를 불러오지 못했습니다.',
										});
									}

									return res.status(200).json({ category, blogs: data });
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

						await Category.findOneAndRemove({ slug: slug.toLowerCase() }).exec(
							(err, data) => {
								if (err) {
									return res.status(400).json({
										error: errorHandler(err),
									});
								}

								return res
									.status(200)
									.json({ success: '카테고리가 성공적으로 지워졌습니다' });
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
