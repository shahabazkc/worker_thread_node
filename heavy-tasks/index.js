import { parentPort } from "worker_threads";

parentPort.on("message", async data => {
  console.log("worker: ", data.worker);
  let da = await heavyTaskAsync(data.worker)
  parentPort.postMessage({ fib: da })
})



export function heavyTaskSync(num) {
  let loopLimit = num
  let count = 1;
  for (let index = 0; index < loopLimit; index++) {
    count += 1;
  }
  //console.log(`Count is ${count}`);
  return count;
}

export async function heavyTaskAsync(worker) {
  let result = 0;
  for (let i = 0; i < 31; i++) {
    result += worker;

    if (i == 30) {
      return result;
    }
  }
}

export function noneHeavyTask(a, b) {
  let result = a + b;
  //console.log(`Addition is ${a + b}`);
  return result;
}


