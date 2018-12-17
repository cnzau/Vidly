import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    // NOTE: Use empty strings cannot be null or undefined since it is controlled in input field
    account: { username: "", password: "" },
    // property with all errors initially set to empty obj
    // if there will be errors we add properties to the empty obj
    // properties map to the name of input fileds (username: 'Username is required.')
    // using obj instead of array to easily find error for a given input field (errors['username'];)
    //  if we used array we would find errors with (errors.find(e => e.name === 'username');)
    errors: {}
  };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";

    // Obj.keys(errors) returns an array of all the keys in the errors obj passed
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

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
