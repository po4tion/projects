/* 
	sendgrid를 사용한 email contact (운영자에게 보내는)
*/

// import sendgrid from '@sendgrid/mail';
const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		switch (method) {
			case 'POST':
				try {
					const { name, email, message } = req.body;
					const sendgridData = {
						to: process.env.EMAIL_ADMIN,
						from: process.env.EMAIL_ADMIN,
						subject: `${process.env.APP_NAME}의 안내 메일`,
						text: `이메일 정보 \n 보낸이: ${name} \n 주소: ${email}`,
						html: `
              <h3>DEVBLOG 이메일 정보</h3>
              <p>보낸이: ${name}</p>
              <p>주소: ${email}</p>
              <p>내용: ${message}</p>
              <hr />
              <p>이 정보는 읽고 파기해주시길 부탁드립니다. 이용자의 소중한 정보가 담겨있습니다</p>
              <p>https://devblog-mu.vercel.app</p>
            `,
					};

					await mail.send(sendgridData);

					return res.status(200).json({ success: '성공' });
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
