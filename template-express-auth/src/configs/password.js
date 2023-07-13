const argon2 = require("argon2");

const hash = (password) => argon2.hash(password);

const verify = (password, hash) => argon2.verify(hash, password);

module.exports = {
	hash,
	verify,
};
