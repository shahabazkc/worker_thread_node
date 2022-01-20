import { Worker } from 'worker_threads'



for (let i = 0; i < 500; i++) {
  if (i == 0) {
    //Create new worker
    const worker = new Worker("./heavy-tasks/index.js");

    //Listen for a message from worker
    worker.on("message", result => {
      console.log(`result of ${i} is: ${result.fib}`);
      worker.terminate()
    });
    worker.on("error", error => {
      console.log(error);
    });

    worker.postMessage({ worker: i, num: 100000 });
  }
  else if (i < 450) {
    //Create new worker
    const worker = new Worker("./heavy-tasks/index.js");
    console.log("thread Id", worker.threadId)
    //Listen for a message from worker
    worker.on("message", result => {
      console.log(`result of ${i} is: ${result.fib}`);
      worker.terminate()
    });
    worker.on("error", error => {
      console.log(error);
    });

    worker.postMessage({ worker: i, num: 10 });
  }
  else {
    continue
  }

}


