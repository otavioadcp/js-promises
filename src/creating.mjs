import setText, { appendText } from "./results.mjs";

export function timeout() {
  const wait = new Promise((resolve) => {
    setTimeout(() => resolve("TimeOut!!!"), 1500);
  });

  wait.then((text) => setText(text));
}

export function interval() {
  const wait = new Promise((resolve) => {
    setInterval(() => {
      console.log("Time");
      resolve("TimeOut!!!");
    }, 1500);
  });

  wait.then((text) => setText(text));
}

export function clearIntervalChain() {
  let interval;

  const wait = new Promise((resolve) => {
    interval = setInterval(() => {
      console.log("Time");
      resolve("Interval");
    }, 1000);
  });

  wait.then((text) => {
    setText(text);
    appendText(" -- Finished --");
    clearInterval(interval);
  });
}

export function xhr() {}

export function allPromises() {}

export function allSettled() {}

export function race() {}
