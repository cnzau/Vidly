import React, { Component } from "react";

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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/* input field have their own state, so turn the element to controlled element by setting value attributes(bind) */}
            <input
              value={account.username}
              onChange={this.handleChange}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
