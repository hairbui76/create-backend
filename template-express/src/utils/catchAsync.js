/**
 * @param {function} fn function to be executed
 * @returns {Promise} promise with resolve value or call next if reject
 */
const catchAsync = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

module.exports = catchAsync;
