/* 
	새로운 태그를 추가한다
*/
import Utag from '/models/Utag';
import { dbConnect, tokenValidation, authMiddleware, errorHandler } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await authMiddleware(req, res, user);

					// 비밀번호 비공개로 전환
					req.profile.password = undefined;

					if (auth) {
						const { name } = req.body;
						const slug = name.split(' ').join('-').toLowerCase();
						const createTag = new Utag({ name, slug });

						await Utag.findOne({ slug }, { new: true }).exec(async (_, tag) => {
							if (tag) {
								return res.status(200).json({ data: tag });
							} else {
								await createTag.save((err, data) => {
									if (err) {
										return res
											.status(400)
											.json({ error: '새로운 태그 저장 실패' });
									}

									return res.status(200).json({ data });
								});
							}
						});
					}
				} catch (error) {
					return res.status(201).json({ error });
				}
				break;
			case 'GET':
				try {
					await Utag.findOne()
						.sort({ createdAt: -1 })
						.exec((err, tags) => {
							if (err) {
								return res.status(400).json({ error: err });
							}

							return res.status(200).json({ success: tags });
						});
				} catch (error) {
					return res.status(201).json({ error });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
