/* 
  블로그 리스트 불러오기
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
					/* 여기서 오류시 populate categories, tags 확인
						오류 발생 이유. populate 즉 참조를 위해서는 참조가
						들어간 mongoose를 최소 한번은 실행해야 한다
						그래서 blog를 create하고 read하면 오류가 안생김 */
					await Blog.find({})
						.populate('categories', '_id name slug')
						.populate('tags', '_id name slug')
						.populate('postedBy', '_id username name')
						.select(
							'categories tags _id title slug excerpt postedBy createdAt updatedAt'
						)
						.exec((err, data) => {
							if (err) {
								return res
									.status(400)
									.json({ error: '블로그 리스트 불러오기 실패' });
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
