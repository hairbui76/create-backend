const { V3 } = require("paseto");

const encode = (payload, secret) => V3.encrypt(payload, secret, { iat: false });

const decode = (token, secret) => V3.decrypt(token, secret);

module.exports = { encode, decode };
