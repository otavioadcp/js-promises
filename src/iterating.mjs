import setText, { appendText } from "./results.mjs";

export async function get() {
  const { data } = await axios.get("http://localhost:3000/orders/1");
  setText(JSON.stringify(data));
}

export async function getCatch() {
  try {
    const { data } = await axios.get("http://localhost:3000/orders/123");
    setText(JSON.stringify(data));
  } catch (e) {
    setText(e);
  }
}

export async function chain() {
  const { data } = await axios.get("http://localhost:3000/orders/1");
  const { data: address } = await axios.get(
    `http://localhost:3000/addresses/${data.shippingAddress}`
  );
  setText(`City: ${address.city}`);
}

export async function concurrent() {
  //here, since promises are eager evaluated, when we define them, they already start the request
  const orderStatus = axios.get("http://localhost:3000/orderStatuses");
  const orders = axios.get("http://localhost:3000/orders");

  setText("");

  //here we are forcing the code to threat each data at time, regardless of wich request finishes first
  const { data: statuses } = await orderStatus;
  const { data: order } = await orders;

  appendText("1 -" + JSON.stringify(statuses) + "-------");
  appendText(JSON.stringify(order[0]));
}

export async function parallel() {
  setText("");

  await Promise.all([
    (async () => {
      const { data } = await axios.get("http://localhost:3000/orderStatuses");
      appendText("--1--" + JSON.stringify(data) + "--1--");
    })(),
    (async () => {
      const { data } = await axios.get("http://localhost:3000/orders");
      appendText(JSON.stringify(data[0]));
    })(),
  ]);
}
