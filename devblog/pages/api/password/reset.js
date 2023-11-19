/* 
  사용자가 잊어버린 비밀번호를 재설정
*/

import User from '/models/User';
import { dbConnect } from '/lib';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'PUT':
				try {
					const { resetPasswordLink, newPassword } = req.body;
					const JWT_SECRET_RESET = process.env.JWT_SECRET_RESET;

					if (resetPasswordLink) {
						jwt.verify(
							resetPasswordLink,
							JWT_SECRET_RESET,
							async (err, decoded) => {
								if (err) {
									return res
										.status(401)
										.json({ error: '링크 수신으로부터 5분이 지났습니다.' });
								}

								await User.findOne({ resetPasswordLink }).exec(
									async (err, user) => {
										if (err || !user) {
											return res
												.status(400)
												.json({ error: '해당 사용자가 없습니다' });
										}

										const updateInfo = {
											resetPasswordLink: '',
										};

										user = _.extend(user, updateInfo);
										await user.setPwd(newPassword);

										await user.save((err, result) => {
											if (err) {
												return res
													.status(400)
													.json({ error: '비밀번호 재설정 실패' });
											}

											return res
												.status(200)
												.json({ success: '비밀번호 재설정 완료' });
										});
									}
								);
							}
						);
					}
				} catch (error) {
					return res.status(400).json({ error: 'resetPasswordLink 확인 불가' });
				}
				break;

			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
