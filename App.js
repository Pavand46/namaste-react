// const heading = React.createElement(
//   "h1",
//   { id: "header" },
//   "Hello world from React"
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(heading);

// console.log(heading); //Object

// Creating a nested HTML Structure

/*

<div id = "parent">

  <div id = "child">

    <h1>I am inside h1 tag</h1>

  <div>

  <div id = "child">

    <h1>I am inside h1 tag</h1>

  <div>

<div>
*/

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am inside h1 tag"),
    React.createElement("h2", {}, "I am inside h2 tag"),
  ]),
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am inside h1 tag"),
    React.createElement("h2", {}, "I am inside h2 tag"),
  ]),
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
