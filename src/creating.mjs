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

export function xhr() {
  let request = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/7");
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject("Request Failed");
    xhr.send();
  });

  request
    .then((result) => setText(result))
    .catch((reason) => setText(reason + " --Catch Block--"));
}

export function allPromises() {
  const categories = axios.get("http://localhost:3000/itemCategories");
  const userTypes = axios.get("http://localhost:3000/userTypes");
  const order = axios.get("http://localhost:3000/orderStatuses");

  //Waits for ALL promises to be fulfilled or ONE of them be rejected
  Promise.all([categories, userTypes, order])
    .then(([cat, user, order]) => {
      setText("  Categories   ");
      appendText(JSON.stringify(cat.data));
      appendText("***" + JSON.stringify(user.data) + "***");
      appendText(JSON.stringify(order.data));
    })
    .catch((reason) => {
      setText(reason);
    });
}

export function allSettled() {}

export function race() {}
