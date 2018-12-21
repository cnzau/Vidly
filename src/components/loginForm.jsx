import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    // NOTE: Use empty strings cannot be null or undefined since it is controlled in input field
    data: { username: "", password: "" },
    // property with all errors initially set to empty obj
    // if there will be errors we add properties to the empty obj
    // properties map to the name of input fileds (username: 'Username is required.')
    // using obj instead of array to easily find error for a given input field (errors['username'];)
    //  if we used array we would find errors with (errors.find(e => e.name === 'username');)
    errors: {}
  };

  // scheme for joi not part of state since it will not be changing
  // dependent for each form
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server and save changes then redirect user
    console.log("Submited");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
