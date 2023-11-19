'use strict';

const uniqueMessage = error => {
	let output;
	try {
		output = '이미 존재합니다';
	} catch (ex) {
		output = '이미 존재합니다';
	}

	return output;
};

export default function errorHandler(error) {
	let message = '';

	if (error.code) {
		switch (error.code) {
			case 11000:
			case 11001:
				message = uniqueMessage(error);
				break;
			default:
				message = '중복 외 오류입니다';
		}
	} else {
		for (let errorName in error.errorors) {
			if (error.errorors[errorName].message)
				message = error.errorors[errorName].message;
		}
	}

	return message;
}
