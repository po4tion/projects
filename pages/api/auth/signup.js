import User from '/models/User';
import { dbConnect } from '/lib';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { token } = req.body;

					if (token) {
						jwt.verify(
							token,
							process.env.JWT_SECRET_BEFORE,
							async (err, decoded) => {
								if (err) {
									return res
										.status(401)
										.json({ error: '링크 수신으로부터 5분이 지났습니다.' });
								}

								const { name, email, password } = decoded;
								const username = nanoid(10);
								const profile = `${process.env.API}/profile/${username}`;
								const createUser = new User({
									username,
									name,
									email,
									profile,
								});

								await createUser.setPwd(password);
								await createUser.save((err, _) => {
									if (err) {
										return res
											.status(400)
											.json({ error: '사용자 정보 저장 실패' });
									}

									return res
										.status(201)
										.json({ success: '가입인증 확인되었습니다.' });
								});
							}
						);
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
