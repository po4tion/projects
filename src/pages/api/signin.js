import User from 'models/User';
import dbConnect from 'lib/dbConnect';

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
						res.status(400).json({ error: '비밀번호가 일치하지 않습니다' });
						return;
					}

					res.status(500).json({ success: '로그인 성공!' });
				} catch (error) {
					res.status(400).json({ success: error });
					return;
				}
				break;
			default:
				res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
