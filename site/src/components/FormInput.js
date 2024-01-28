import React from "react";

const FormInput = ({
  label,
  name,
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <input
        name={name}
        id={id}
        className={`w-full py-2 rounded-md px-3 text-dark`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={id}
      />
    </div>
  );
};

export default FormInput;

