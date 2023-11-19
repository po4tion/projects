/* 
  검색된 블로그 불러오기
*/

import Blog from '/models/Blog';
import User from '/models/User';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { search } = req.query;

					if (search) {
						await Blog.find({
							$or: [
								{ title: { $regex: search, $options: 'i' } },
								{ body: { $regex: search, $options: 'i' } },
								{ excerpt: { $regex: search, $options: 'i' } },
							], // options 대소문자 구분 X
						})
							.populate('postedBy', 'username')
							.select('-photo -body')
							.sort({ createdAt: -1 })
							.lean()
							.exec((err, blogs) => {
								if (err) {
									return res.status(400).json({ error: '검색 불가능!' });
								}
								return res.status(200).json(blogs);
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
