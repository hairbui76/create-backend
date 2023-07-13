const { Redis } = require("ioredis");
const { redisUri } = require("./config");

const redis = new Redis(redisUri);

module.exports = redis;
