import User from '/models/User';
import Blog from '/models/Blog';
import { dbConnect, tokenValidation, authMiddleware } from '/lib';

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
					const auth = await authMiddleware(req, res, user);

					// 비밀번호 비공개로 전환
					req.profile.password = undefined;

					if (auth) {
						const _id = req.profile._id;
						User.findByIdAndRemove(_id, (err, docs) => {
							if (err) {
								return res.status(400).json(err);
							}

							Blog.deleteMany({ postedBy: _id }).exec((err, blogs) => {
								if (err) {
									return res.status(400).json(err);
								}

								return res.status(200).json({ success: blogs });
							});
						});
					}
				} catch (error) {
					return res.status(400).json({ error: error });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
