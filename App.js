const heading = React.createElement(
  "h1",
  { id: "header" },
  "Hello world from React"
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);

console.log(heading); //Object
