/* 
	프로필에 접근하는 사용자가 mongoose에 실제로 등록되어 있는지 확인한다 
*/

import User from '/models/User';
import { dbConnect } from '/lib';

export default function authMiddleware(req, res, user) {
	return new Promise(async resolve => {
		await dbConnect();

		const userId = user._id;

		const result = await User.findById({ _id: userId }).exec((err, data) => {
			if (err || !data) {
				return res.status(400).json({ error: '유저를 찾을 수 없습니다' });
			}
			req.profile = data;

			// 유저 정보 반환
			return resolve(data);
		});
	});
}
