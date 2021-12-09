/* 
	태그 목록 페이지에서 보여줄 태그들을 가져온다
*/
import Utag from '/models/Utag';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					await Utag.find()
						.sort({ slug: 1 })
						.select('name slug')
						.lean()
						.exec((err, docs) => {
							if (err) {
								return res.status(400).json({ error: err });
							}

							return res.status(200).json({ docs, size: docs.length });
						});
				} catch (error) {
					return res.status(201).json({ error });
				}
				break;
			case 'POST':
				try {
					const { name } = req.body;

					await Utag.find({ name: { $regex: name, $options: 'i' } })
						.select('name slug -_id')
						.lean()
						.exec((err, docs) => {
							if (err) {
								return res.status(400).json({ error: err });
							}

							return res.status(200).json({ docs, size: docs.length });
						});
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
