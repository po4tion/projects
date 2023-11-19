/* 
  해당 유저의 프로필 사진을 설정한다
*/

import Blog from '/models/Blog';
import { dbConnect } from '/lib';

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { slug } = req.query;

					await Blog.findOne({ slug }).exec(async (err, blog) => {
						if (err || !blog) {
							return res
								.status(400)
								.json({ error: '유저의 정보를 찾지 못했습니다' });
						}

						if (blog.photo.data) {
							res.setHeader('Content-type', blog.photo.contentType);

							return res.status(200).json(blog.photo);
						}
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
