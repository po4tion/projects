/* 
  해당 유저의 프로필을 수정한다
*/

import User from '/models/User';
import { dbConnect, tokenValidation, authMiddleware } from '/lib';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

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
			case 'PUT':
				try {
					// 토큰 유효성 검사
					const user = await tokenValidation(req, res).catch(msg =>
						res.status(400).json({ error: 'getTokenError' })
					);

					// 유효성 검사를 통과하고 받은 데이터 전송 후, 프로필 값 반환
					const auth = await authMiddleware(req, res, user);

					req.profile.password = undefined;

					if (auth) {
						const name = req.profile.name;

						await User.findOne({ name }).exec((err, prev) => {
							if (err) {
								return res
									.status(400)
									.json({ error: '해당 유저를 찾을 수 없습니다' });
							}

							const form = new formidable.IncomingForm({
								keepExtensions: true,
							});

							form.parse(req, async (err, fields, files) => {
								if (err) {
									return res.status(400).json({ error: '사진 업로드 실패' });
								}

								prev = _.assignIn(prev, fields);

								if (fields.username) {
									prev.profile = `${
										process.env.API
									}/profile/${encodeURIComponent(fields.username)}`;
								}

								prev.role = req.profile.role;
								prev.email = req.profile.email;

								const { password } = fields;
								const { photo } = files;

								if (password) {
									if (password.length < 6) {
										return res
											.status(400)
											.json({ error: '비밀번호는 8자 이상이어야 합니다' });
									} else {
										await prev.setPwd(password);
									}
								}

								if (photo) {
									if (photo.size > 1500000) {
										return res.status(400).json({
											error: '이미지 크기는 1mb 이하입니다',
										});
									}

									prev.photo.data = fs.readFileSync(photo.filepath);
									prev.photo.contentType = files.photo.mimetype;
								}

								await prev.save((err, userInfo) => {
									if (err) {
										return res.status(400).json({
											error: err,
										});
									}

									userInfo.password = undefined;
									userInfo.photo = undefined;

									return res.status(200).json(userInfo);
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
