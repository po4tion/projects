/* 
  1. 해당 사진 정보를 가져온다
*/

import Blog from '/models/Blog';
import { dbConnect } from '/lib';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function handler(req, res) {
	return new Promise(async () => {
		const { method } = req;

		await dbConnect();

		switch (method) {
			case 'GET':
				try {
					const { slug } = req.query;

					await Blog.findOne({ slug: slug.toLowerCase() })
						.select('photo')
						.exec(async (err, blog) => {
							if (err || !blog) {
								return res.status(400).json({
									error: '사진을 찾을 수 없습니다',
								});
							}
							await res.setHeader('Content-type', blog.photo.contentType);

							return res.status(200).send(blog.photo.data);
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
