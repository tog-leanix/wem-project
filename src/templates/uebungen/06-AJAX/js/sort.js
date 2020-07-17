self.addEventListener("message", ev => {
  const data = ev.data[0];
  console.log(data);
  data.sort();
  self.postMessage([data]);
})