import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    // Joi.validate(obj_to_be_validated, schema, prevent_abort_on_1st_error)
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // if falsey
    if (!error) return null;
    // else get error.details array and map it into an obj
    const errors = {};
    // itterate over the array and for each error msg we dd a new property to errors obj
    // interested in message and path properties in each array
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
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

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    // set errors if errors obj is truefy else set to an empty obj. NOTE:Can't be null
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // clone current state of errors
    const errors = { ...this.state.errors };
    // validation for an input onChange
    const errorMessage = this.validateProperty(input);
    // set or delete error message of an input to cloned errors
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // To work with properties of an obj dynamically we use bracket instead of dot notation
    // For multiple iputs give each input a name attr then read them dynamically with e.c...name
    data[input.name] = input.value;
    // set errors state too
    this.setState({ data, errors });
  };

  //   No render method since form component is not supposed to render anything
}

export default Form;
