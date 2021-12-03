/* 
	1. GET 북마크 checked
	2. POST OneBlog 북마크 추가, 삭제 관리
*/

import Bookmark from '/models/Bookmark';
import Blog from '/models/Blog';
import { dbConnect, authMiddleware, tokenValidation } from '/lib';

export default function handler(req, res) {
	return new Promise(async resolve => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { email, slug } = req.query;

					await Bookmark.findOne({ $and: [{ email }, { list: slug }] })
						.select('_id')
						.lean()
						.exec(async (err, docs) => {
							if (err) {
								return res.status(400).json({ error: '북마크 findOne 에러' });
							}

							return res.status(200).json({ docs });
						});
				} catch (error) {
					return res.status(400).json({ error: '에러' });
				}
				break;
			case 'POST':
				try {
					const { email, slug } = req.body;

					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					const auth = await authMiddleware(req, res, user);

					req.profile.password = undefined;

					if (auth) {
						Bookmark.findOne({ email }).exec(async (err, docs) => {
							if (err || !docs) {
								let create = new Bookmark();

								create.email = email;
								create.list = [slug];

								await create.save((err, docs) => {
									if (err) {
										return res.status(400).json({ error: err });
									}

									return res.status(200).json({ success: '북마크 저장 완료' });
								});
							} else {
								const idx = docs.list.indexOf(slug);

								if (idx !== -1) {
									docs.list.splice(idx, 1);
								} else {
									docs.list = [...docs.list, slug];
								}

								await docs.save((err, docs) => {
									if (err) {
										return res.status(400).json({ error: err });
									}

									return res.status(200).json({ success: '북마크 저장 완료' });
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
