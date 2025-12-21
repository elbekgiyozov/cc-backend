import { log, readLogs } from "./logger.js";

log("APP STARTED");

setTimeout(() => {
  log("FIRST TIMEOUT EVENT");
}, 2000);

let counter = 0;

const intervalId = setInterval(() => {
  counter++;
  log("INTERVAL TICK");

  if (counter === 3) {
    clearInterval(intervalId);
    log("INTERVAL STOPPED");
  }
}, 1000);

setTimeout(() => {
  const logs = readLogs();

  console.log("\n📄 ===== START =====\n");
  console.log(logs);
  console.log("===== END =====\n");
}, 6000);
