const pino = require("pino");
const pretty = require("pino-pretty")
const prettyPrint = {
	colorize: true,
	levelFirst: true,
	translateTime: "yyyy/mm/dd HH:MMo",
};
if (process.env.NODE_ENV !== "production") {
	prettyPrint.ignore = "pid,hostname,reqId,res,req,responseTime";
	prettyPrint.messageFormat =
	"{msg} [{req.method} {req.url}:> {responseTime}ms]";
}
const stream = pretty(prettyPrint);

const pinocfg = {
	stream,
	serializers: {
		req: function (req) {
			return {
				...pino.stdSerializers.req(req),
				remoteAddress: req.remoteAddress,
				remotePort: req.remotePort,
				body: req.raw.body,
			};
		},
		res: pino.stdSerializers.res,
		err: pino.stdSerializers.err,
	},
};

module.exports = pinocfg;
