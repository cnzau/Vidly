import React from "react";

const Input = ({ name, label, type = "text", value, onChange }) => {
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
    </div>
  );
};

export default Input;
