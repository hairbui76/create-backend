const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

console.log("Total CPUs: ", numCPUs);
console.log("Primary pid: ", process.pid);

cluster.setupPrimary({
	exec: __dirname + "/server.js",
});

// Fork workers.
for (let i = 0; i < numCPUs; i++) {
	console.log(`Forking process number ${i}...`);
	cluster.fork();
}

cluster.on("exit", (worker, _code, _signal) => {
	console.log(`Worker ${worker.process.pid} died`);
	console.log("Starting a new worker");
	cluster.fork();
});
