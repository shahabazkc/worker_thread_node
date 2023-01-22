import cluster from "cluster";
import { parentPort, workerData } from "worker_threads";

let n = workerData.n;
let count = 0;
console.log(`On worker thread process ${process.pid}`);
if (n > 5000000000) n = 5000000000;

for (let i = 0; i <= n; i++) {
    count += i;
}

parentPort.postMessage(`Final count is ${count}`)
