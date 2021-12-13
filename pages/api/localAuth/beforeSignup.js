/* 
  회원가입 완료 전 이메일 인증을 받도록 하여 타인 이메일 무단 사용 방어
*/

import { dbConnect } from '/lib';
import User from '/models/User';
import jwt from 'jsonwebtoken';
import mail from '@sendgrid/mail';
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { name, email, password } = req.body;

					await User.findOne({ email }).exec(async (_, value) => {
						// email을 조건으로 등록된 유저인지 확인한다
						if (value) {
							return res
								.status(400)
								.json({ error: '이메일이 이미 존재합니다' });
						}

						const token = jwt.sign(
							{ name, email, password },
							process.env.JWT_SECRET_BEFORE,
							{ expiresIn: '5m' }
						);

						const url = `${process.env.API}/user/beforeCheck/${token}`;

						const sendgridData = {
							to: email,
							from: process.env.EMAIL_ADMIN,
							subject: `${process.env.APP_NAME} 본인 인증 메일`,
							html: `
                <p>아래의 링크를 클릭하여 이메일 인증을 완료해주세요</p>
                <p>아래의 링크는 5분 후 파기됩니다</p>
                <a href=${url}>링크 클릭</a>
                <p>본 메일은 DEVBLOG에서 정식으로 보낸 이메일입니다</p>
                <a href="https://devblog-mu.vercel.app" alt="devblog">https://devblog-mu.vercel.app</a>
              `,
						};

						await mail.send(sendgridData).then(_ => {
							return res.status(200).json({
								success:
									'본인 인증 이메일 송신 완료 (링크는 5분간 사용 가능합니다)',
							});
						});
					});
				} catch (error) {
					return res.status(400).json({ error: error });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
