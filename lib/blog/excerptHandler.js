export const excerptHandler = (body, maxLength, space, lastWord) => {
	if (body.length <= maxLength) {
		return body;
	}

	let limitBody = body.substr(0, maxLength);
	const lastSpaceIdx = limitBody.lastIndexOf(space);

	if (lastSpaceIdx >= 0) {
		limitBody = limitBody.substr(0, lastSpaceIdx);
	}

	if (limitBody) {
		limitBody += lastWord;
	}

	return limitBody;
};
