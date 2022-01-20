import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';
import express from 'express'
//User Api Router
import { userApiRoute } from './router.js'


const totalCPUs = cpus().length;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', userApiRoute);

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {


  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(5000, () => {
    //  console.log("Ported started on ", 5000);
  })

  // console.log(`Worker ${process.pid} started`);
}


console.log(`${process.pid} is working here`)

