const isBefore = (date1, date2 = new Date()) => new Date(date1) < date2;

const addHours = (date, hours) => {
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	return date;
};

const addWeeks = (date, weeks) => {
	date.setTime(date.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
	return date;
};

module.exports = {
	isBefore,
	addHours,
	addWeeks,
};
