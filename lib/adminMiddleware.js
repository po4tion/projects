/* 
	해당 페이지에 접근하는 사용자가 운영자인지 확인한다
*/
import User from '/models/User';
import { dbConnect } from '/lib';

export default function adminMiddleware(req, res, user) {
	return new Promise(async resolve => {
		await dbConnect();

		const userId = user._id;

		const result = await User.findById({ _id: userId }).exec((err, data) => {
			if (err || !data) {
				return res.status(400).json({ error: '유저를 찾을 수 없습니다' });
			}

			if (data.role !== 1) {
				return res.status(400).json({ error: '운영자가 아닙니다. 접근 불가' });
			}

			req.profile = data;
			// 유저 정보 반환
			return resolve(data);
		});
	});
}
