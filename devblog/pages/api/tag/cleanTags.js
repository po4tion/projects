/* 
	태그 목록 페이지에서 보여줄 태그들을 가져온다
*/
import Utag from '/models/Utag';
import Blog from '/models/Blog';
import { dbConnect, tokenValidation, adminMiddleware } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'POST':
				try {
					const { id } = req.body;

					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					const auth = await adminMiddleware(req, res, user);

					req.profile.password = undefined;

					if (auth) {
						const result = await Blog.find({ tags: id }).exec(
							async (err, docs) => {
								if (docs.length === 0) {
									const result = await Utag.findOneAndDelete({ _id: id });

									return res.json(result);
								}
							}
						);
					}
				} catch (error) {
					return res.status(201).json({ error });
				}
				break;
			default:
				return res.status(400).json({ error: 'request method를 확인해주세요' });
				break;
		}
	});
}
