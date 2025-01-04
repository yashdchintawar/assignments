const data = [
  {
    id: 1,
    todo: "what to do",
  },
  {
    id: 2,
    todo: "this is first to do",
  },
  {
    id: 3,
    todo: "this is first to do",
  },
];

data.forEach((element, index) => {
  if (element.id === 1) {
    data.splice(index, 1);
    return;
  }
});

console.log(data);


// data.filter((item) => item.id === 1);

// console.log(data);

// const filteredData = data.filter((item) => item.id === 1);

// console.log("Filtered Data:", filteredData);
// console.log("Original Data:", data);
