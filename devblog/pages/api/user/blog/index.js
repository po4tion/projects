/* 
	새로운 블로그를 추가한다
*/
import Blog from '/models/Blog';
import { dbConnect, tokenValidation, authMiddleware } from '/lib';
import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';

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
			case 'POST':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await authMiddleware(req, res, user);

					// 비밀번호 비공개로 전환
					req.profile.password = undefined;

					if (auth) {
						// form 객체 생성(확장자 포함)
						const form = new formidable.IncomingForm({ keepExtensions: true });

						// text data는 fields, file data는 files
						form.parse(req, async (err, fields, files) => {
							if (err) {
								return res.status(400).json({ error: '사진 업로드 실패' });
							}

							const { title, body, tags, excerpt } = fields;

							if (!title || !title.length) {
								return res.status(400).json({
									error: '제목이 필요합니다',
								});
							} else if (!body || body.length < 10) {
								return res.status(400).json({
									error: '내용이 너무 짧습니다(10자 이상)',
								});
							} else if (!tags || !tags.length) {
								return res.status(400).json({
									error: '최소 하나의 태그가 필요합니다.',
								});
							}

							// 블로그 모델 생성
							let blog = new Blog();

							blog.title = title;
							blog.slug = title.split(' ').join('-').toLowerCase();
							blog.body = body;
							blog.sTitle = `${process.env.APP_NAME} | ${title} `;
							blog.postedBy = user._id;

							if (excerpt) {
								blog.excerpt = excerpt;
								blog.sDesc = excerpt.substring(0, 80);
							} else {
								blog.excerpt = '소개문구가 등록되지 않았습니다';
								blog.sDesc = '설명이 등록되지 않았습니다';
							}

							// file data[photo]
							if (files.photo) {
								if (files.photo.size >= 1500000) {
									return res.status(400).json({
										error: '사진은 1mb를 넘을 수 없습니다.',
									});
								}

								blog.photo.data = fs.readFileSync(files.photo.filepath);
								blog.photo.contentType = files.photo.mimetype;
							} else {
								const res = await axios.get(
									`${process.env.API}/images/basic.webp`,
									{ responseType: 'arraybuffer' }
								);
								const buffer = Buffer.from(res.data, 'utf-8');

								blog.photo.data = buffer;
								blog.photo.contentType = 'image/webp';
							}

							// 블로그 저장과 태그
							const _tags = tags && tags.split(',');

							blog.save(async (err, result) => {
								if (err) {
									return res.status(400).json({
										error: '제목이 중복됩니다.',
									});
								}

								// 태그
								await Blog.findByIdAndUpdate(
									result._id,
									{ $push: { tags: _tags } },
									{ new: true }
								).exec((err, result) => {
									if (err) {
										return res.status(400).json({
											error: err,
										});
									}

									return res.status(201).json({ data: result });
								});
							});
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
