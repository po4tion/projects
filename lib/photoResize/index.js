import imageCompression from 'browser-image-compression';

// e.target.files[0] => files
export const photoResize = async files => {
	const file = files;

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 300,
		initialQuality: 1,
	};

	try {
		const compressedFile = await imageCompression(file, options);

		return compressedFile;
	} catch (error) {
		return error;
	}
};
