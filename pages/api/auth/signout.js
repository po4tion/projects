import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					return res.status(200).json({ success: '로그아웃 되었습니다' });
				} catch (error) {
					return res.status(400).json({ success: error });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
