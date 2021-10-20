import dbConnect from 'lib/dbConnect';
import User from 'models/User';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'POST':
			try {
				const createUser = new User({
					username: req.body.username,
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					profile: req.body.profile,
				});

				await createUser.save();

				res.status(200).json({ success: true, data: createUser });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
