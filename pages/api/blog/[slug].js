/* 
  1. 해당 블로그의 정보를 가져온다
	2. 해당 블로그를 정보를 제거한다
  3. 해당 블로그를 업데이트 한다
*/

import Blog from '/models/Blog';
import {
	dbConnect,
	adminMiddleware,
	tokenValidation,
	excerptHandler,
} from '/lib';
import formidable from 'formidable';
import _ from 'lodash';
import { stripHtml } from 'string-strip-html';
import fs from 'fs';

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
						.populate('tags', '_id name slug')
						.populate('postedBy', '_id username name')
						.select(
							'tags _id title slug body sTitle sDesc postedBy createdAt updatedAt'
						)
						.exec((err, data) => {
							if (err) {
								return res.status(400).json({
									error: '해당 블로그를 불러오지 못했습니다.',
								});
							}

							return res.status(200).json({ data });
						});
				} catch (error) {
					return res.status(400).json({ error: '에러' });
				}
				break;
			case 'DELETE':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await adminMiddleware(req, res, user);

					req.profile.password = undefined;

					if (auth) {
						const { slug } = req.query;

						await Blog.findOneAndRemove({ slug: slug.toLowerCase() }).exec(
							(err, data) => {
								if (err) {
									return res.status(400).json({
										error: '해당 블로그 삭제를 실패했습니다',
									});
								}

								return res
									.status(200)
									.json({ success: '해당 블로그를 삭제했습니다' });
							}
						);
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
