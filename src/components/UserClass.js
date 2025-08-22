import { Component } from "react";

class UserClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: "Hello",
      location: "Dummy location",
    };

    console.log("constructor");
  }

  // async componentDidMount() {
  //   console.log("didMount");
  //   const data = await fetch("https://api.github.com/users/timmywheels");
  //   const json = await data.json();

  //   console.log(json);

  //   this.setState({
  //     name: json.name,
  //     location: json.location,
  //   });
  // }

  componentDidMount() {
    this.interval = setInterval(() => {
      // console.log("serInterval");
    }, 1000);
  }

  componentDidUpdate() {
    // console.log("didUpdate");
  }

  componentWillUnmount() {
    // console.log("willunmount");
    clearInterval(this.interval);
  }
  render() {
    const { name, location } = this.props;
    // console.log("render");
    return (
      <div className="user">
        <h2>{name} </h2>
        <h3>{location}</h3>
        <h4>count : {this.state.count}</h4>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Increment
        </button>
      </div>
    );
  }
}

export default UserClass;
