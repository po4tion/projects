/* 
  사용자가 비밀번호를 잊어버려 다시 설정하기 위해 sendgrid 메일로 초기화 링크 송신
*/

import User from '/models/User';
import { dbConnect } from '/lib';
const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'PUT':
				try {
					const { email } = req.body;

					await User.findOne({ email }).exec(async (err, user) => {
						if (err || !user) {
							return res.status(400).json({
								error: '해당 이메일은 존재하지 않습니다',
							});
						}

						const resetToken = await user.generateResetToken();

						const sendgridData = {
							to: email,
							from: process.env.EMAIL_ADMIN,
							subject: `${process.env.APP_NAME} 비밀번호 찾기 안내 메일`,
							html: `
                <p>아래의 링크를 클릭하여 비밀번호를 초기화 해주세요</p>
                <p>아래의 링크는 5분 후 파기됩니다</p>
                <p>${process.env.API}/user/reset/${resetToken}</p>
                <p>https://devblog-mu.vercel.app</p>
              `,
						};

						await user
							.updateOne({ resetPasswordLink: resetToken })
							.exec(async (err, data) => {
								if (err) {
									return res
										.status(400)
										.json({ error: '유저 비밀번호 토큰 저장 실패' });
								}

								await mail.send(sendgridData).then(_ => {
									return res.status(200).json({
										success:
											'비밀번호 초기화 메일 송신 완료 (링크는 5분간 사용 가능합니다)',
									});
								});
							});
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
