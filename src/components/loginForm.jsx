import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    // NOTE: Use empty strings cannot be null or undefined since it is controlled in input field
    account: { username: "", password: "" }
  };

  handleSubmit = e => {
    e.preventDefault();

    // Call the server and save changes then redirect user
    console.log("Submited");
  };

  //   handleChange = e => {
  //     const account = { ...this.state.account };
  //     account[e.currentTarget.name] = e.currentTarget.value;
  //     this.setState({ account });
  //   };
  // we can distructure the e.currentTarget and rename to input

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    // To work with properties of an obj dynamically we use bracket instead of dot notation
    // For multiple iputs give each input a name attr then read them dynamically with e.c...name
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            type="password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
