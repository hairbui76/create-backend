const pino = require("pino");
const option = {
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			levelFirst: true,
			sync: false,
		},
	},
};
if (process.env.NODE_ENV !== "production") {
	option.transport.options.ignore = "pid,hostname,reqId,res,req,responseTime";
	option.transport.options.messageFormat =
		"{msg} [{req.method} {req.url}:> {responseTime}ms]";
}

const pinocfg = {
	logger: pino(option),
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
	customLogLevel: function (req, res, err) {
		if (res.statusCode >= 400 && res.statusCode < 500) {
			return "warn";
		} else if (res.statusCode >= 500 || err) {
			return "error";
		}
		return "info";
	},
};

module.exports = pinocfg;
