/* 
  해당 유저의 프로필 사진을 설정한다
*/

import User from '/models/User';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { test } = req.query;

					await User.findOne({ username: test }).exec(async (err, user) => {
						if (err || !user) {
							return res
								.status(400)
								.json({ error: '유저의 정보를 찾지 못했습니다' });
						}

						if (user.photo.data) {
							res.setHeader('Content-type', user.photo.contentType);

							return res.status(200).json(user.photo);
						}
					});
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
