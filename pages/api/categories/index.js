/* 
  카테고리의 모든 리스트를 불러온다
*/

import Category from '/models/Category';
import { dbConnect, categoryErrorHandler } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					await Category.find({}).exec((err, data) => {
						if (err) {
							return res.status(400).json({ error: categoryErrorHandler(err) });
						}

						return res.status(200).json({ data });
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
