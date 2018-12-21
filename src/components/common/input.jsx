import React from "react";

// use rest operator to get the other properties from the props obj
// rest includes any other prop other than name, label & error
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* use spread operator to initialize attr with the rest parameter */}
      <input {...rest} id={name} name={name} className="form-control" />
      {/* Only renders if error is truefy */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
