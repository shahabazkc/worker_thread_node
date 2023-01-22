import express from "express";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { Worker } from "worker_threads";

const app = express()
//const router = express.Router();

const totalCpus = cpus().length;
const port = 3000;


if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCpus}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    };


    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {
    startServer();
};

function startServer() {
    console.log(`Worker ${process.pid} started`);
    app.get("/", (req, res) => {
        console.log(`On process ${process.pid}`);
        res.send("Hello World!");
    });

    app.get("/api/:n", function (req, res) {
        console.log(`On process ${process.pid}`);
        const worker = new Worker('./worker.js', { workerData: { n: req.params.n } });
        worker.on('message', (data) => {
            res.status(200).send(data);
        })
    });



    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};