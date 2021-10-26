import User from '/models/User';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { email, password } = req.body;
					const findUser = await User.findOne({ email });

					if (!findUser) {
						res.status(400).json({ error: '등록된 사용자가 아닙니다' });
						return;
					}

					const matchPassword = await findUser.matchPwd(password);

					if (!matchPassword) {
						res.status(400).json({ pwdError: '비밀번호가 일치하지 않습니다' });
						return;
					}

					// 토큰 발급
					const token = await findUser.generateToken();

					const { _id, username, name, email: _email, role } = findUser;

					res.status(201).json({
						token,
						data: {
							_id,
							username,
							name,
							email: _email,
							role,
						},
					});
				} catch (error) {
					res.status(400).json({ error: error });
					return;
				}
				break;
			default:
				res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
