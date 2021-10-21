import User from 'models/User';
import { dbConnect } from 'lib';
import { nanoid } from 'nanoid';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { name, email, password } = req.body;

					await User.findOne({ email }).exec((_, value) => {
						// email을 조건으로 등록된 유저인지 확인한다
						if (value) {
							res.status(400).json({ error: '이메일이 이미 존재합니다' });
							return;
						}
					});

					// 등록되지 않은 유저라면
					const username = nanoid(10);
					const profile = `${process.env.DEV_API_URL}/profile/${username}`;
					const createUser = new User({
						username,
						name,
						email,
						profile,
					});

					await createUser.setPwd(password);

					await createUser.save((err, _) => {
						if (err) {
							res.status(400).json({ error: '사용자 정보 저장 실패' });
							return;
						}

						res.status(201).json({ success: '가입해주셔서 감사합니다!' });
					});
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
