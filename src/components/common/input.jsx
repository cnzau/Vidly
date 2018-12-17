import React from "react";

const Input = ({ name, label, type = "text", value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* input field have their own state, so turn the element to controlled element by setting value attributes(bind) */}
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {/* Only renders if error is truefy */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
