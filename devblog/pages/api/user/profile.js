/* 
	유저의 정보를 가져온다
*/

import { tokenValidation, authMiddleware } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		switch (method) {
			case 'GET':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await authMiddleware(req, res, user);

					req.profile.password = undefined;
					req.profile.photo = undefined;

					if (auth) {
						return res.status(200).json({ profile: req.profile });
					} else {
						return res
							.status(400)
							.json({ error: '프로필 정보를 불러오지 못했습니다' });
					}
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
