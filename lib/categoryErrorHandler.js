'use strict';

const uniqueMessage = error => {
	let output;
	try {
		let fieldName = error.message.substring(
			error.message.lastIndexOf('.$') + 2,
			error.message.lastIndexOf('_1')
		);
		output =
			fieldName.charAt(0).toUpperCase() +
			fieldName.slice(1) +
			' 이미 존재하는 카테고리입니다';
	} catch (ex) {
		output = '이미 존재하는 카테고리입니다';
	}

	return output;
};

export default function categoryErrorHandler(error) {
	let message = '';

	if (error.code) {
		switch (error.code) {
			case 11000:
			case 11001:
				message = uniqueMessage(error);
				break;
			default:
				message = '중복 카테고리 외 오류입니다';
		}
	} else {
		for (let errorName in error.errorors) {
			if (error.errorors[errorName].message)
				message = error.errorors[errorName].message;
		}
	}

	return message;
}
