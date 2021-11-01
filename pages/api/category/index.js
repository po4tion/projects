/* 
	새로운 카테고리를 추가한다
*/
import Category from '/models/Category';
import {
	dbConnect,
	tokenValidation,
	adminMiddleware,
	categoryErrorHandler,
} from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await adminMiddleware(req, res, user);

					// 비밀번호 비공개로 전환
					req.profile.password = undefined;

					if (auth) {
						const { name } = req.body;
						const slug = name.split(' ').join('-').toLowerCase();
						const categoryCategory = new Category({ name, slug });

						await categoryCategory.save((err, data) => {
							if (err) {
								return res
									.status(400)
									.json({ error: categoryErrorHandler(err) });
							}

							return res.status(201).json({ data });
						});
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
