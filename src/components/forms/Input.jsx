import React from "react";
import { v4 as uuidv4 } from "uuid";

function Input({
  name,
  type,
  label,
  validation,
  validationMessage,
  value,
  handleChange,
}) {
  return (
    <div className="form-floating mb-3 ">
      <input
        type={type ?? "text"}
        name={name}
        className={`form-control ${validation}`}
        id={`${name}-${uuidv4()}`}
        placeholder={label}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="name">{label}</label>
      <small className="text-danger fst-italic">{validationMessage}</small>
    </div>
  );
}

export default Input;
