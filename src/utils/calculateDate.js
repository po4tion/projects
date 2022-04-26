export const calculateDate = () => {
	const current = new Date();

	const year = current.getFullYear();
	const month = current.getMonth() + 1;
	const date = current.getDate();
	const hour = current.getHours();
	const minute = current.getMinutes();

	const currentDate = `${year}${month < 10 ? `0${month}` : month}${
		date < 10 ? `0${date}` : date
	}`;

	/* *
	 * * API 미제공 시간대 컨트롤
	 */
	if (hour < 10 && minute < 31) {
		return currentDate - 1;
	} else {
		return currentDate;
	}
};

export const calcChartDate = (term, type) => {
	const current = new Date();
	const hour = current.getHours();
	const minute = current.getMinutes();
	let date = null;

	/* *
	 * * API 미제공 시간대 컨트롤
	 */
	if (hour < 10 && minute < 31) {
		date = current.getDate() - 1;
	} else {
		date = current.getDate();
	}

	const termStore = [];

	for (let i = term - 1; i >= 0; i--) {
		const _current = new Date(new Date().setDate(date - i));

		const _year = _current.getFullYear();
		const _month = _current.getMonth() + 1;
		const _date = _current.getDate();
		let result = null;

		if (type === 'label') {
			result = `${_month}월 ${_date}일`;
			termStore.push(result);
		} else {
			result = `${_year}${_month < 10 ? `0${_month}` : _month}${
				_date < 10 ? `0${_date}` : _date
			}`;
			termStore.unshift(result);
		}
	}

	return termStore;
};
