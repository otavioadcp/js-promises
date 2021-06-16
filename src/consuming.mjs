import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

export function get() {
  axios.get("http://localhost:3000/orders/1").then(({ data }) => {
    setText(JSON.stringify(data));
  });
}

export function getCatch() {
  axios
    .get("http://localhost:3000/orders/123")
    .then(({ data }) => {
      setText(JSON.stringify(data));
    })
    .catch((error) => {
      setText(error);
    });
}

export function chain() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => setText(`City: ${data.city}`));
}

export function chainCatch() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    // This 'catch' block will only work for the first 'then' and after that, he return an object because if didn't, the second 'then'
    // will throw another error, because the 'data' object will be undefined and they cannot search fro 'data.my.city'
    // .catch((error) => {
    //   setText(error);
    //   return { data: {} };
    // })
    .then(({ data }) => setText(`City: ${data.my.city}`))
    //this 'catch' will work with the two 'then' above him, so, if one of then fails, will end at this catch block
    .catch((error) => setText(error));
}
export function final() {}
