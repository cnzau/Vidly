import React, { Component } from "react";
import Joi from "joi-browser";
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

  // scheme for joi not part of state since it will not be changing
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    // Joi.validate(obj_to_be_validated, schema, prevent_abort_on_1st_error)
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    // if falsey
    if (!error) return null;
    // else get error.details array and map it into an obj
    const errors = {};
    // itterate over the array and for each error msg we dd a new property to errors obj
    // interested in message and path properties in each array
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    // set errors if errors obj is truefy else set to an empty obj. NOTE:Can't be null
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server and save changes then redirect user
    console.log("Submited");
  };

  // validation for every input
  validateProperty = ({ name, value }) => {
    // create const for use with particular input validation
    // using es6 computed values
    const obj = { [name]: value };
    // using es6 computed value and picking this.schema for the specified input
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //   handleChange = e => {
  //     const account = { ...this.state.account };
  //     account[e.currentTarget.name] = e.currentTarget.value;
  //     this.setState({ account });
  //   };
  // we can distructure the e.currentTarget and rename to input

  handleChange = ({ currentTarget: input }) => {
    // clone current state of errors
    const errors = { ...this.state.errors };
    // validation for an input onChange
    const errorMessage = this.validateProperty(input);
    // set or delete error message of an input to cloned errors
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    // To work with properties of an obj dynamically we use bracket instead of dot notation
    // For multiple iputs give each input a name attr then read them dynamically with e.c...name
    account[input.name] = input.value;
    // set errors state too
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            type="password"
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
