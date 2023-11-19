import jwt from 'jsonwebtoken';

export default function tokenValidation(req, res) {
	return new Promise(async resolve => {
		const JWT_SECRET = process.env.JWT_SECRET;
		let token = req.headers['authorization'];

		if (token.startsWith('Bearer')) {
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, JWT_SECRET, async (err, decoded) => {
				if (err) {
					return res
						.status(401)
						.json({ error: '토큰이 만료되었습니다. 잠시 후 로그아웃 됩니다' });
				} else {
					const decoded_data = decoded;

					// 유저 _id, iat, exp 반환
					return resolve(decoded_data);
				}
			});
		} else {
			return res.status(400).json({ error: '토큰이 존재하지 않습니다.' });
		}
	});
}
