/* 
	1. 북마크 전체 크기 측정
*/

import Bookmark from '/models/Bookmark';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { email } = req.query;

					await Bookmark.findOne({ email })
						.lean()
						.exec((err, docs) => {
							if (err || !docs) {
								return res.status(400).json({ error: '북마크 findOne 에러' });
							}

							return res.status(200).json({ size: docs.list.length });
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
