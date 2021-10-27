import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					// access token 값을 제거
					res.clearCookie('access-token');

					res.status(201).json({ success: '로그아웃 되었습니다' });
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
