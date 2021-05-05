import React from "react";
import { FormControl } from "react-bootstrap";

const BaeFormControl = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  size,
  ...rest
}) => {
  return (
    <FormControl
      type={type}
      onChange={onChange}
      value={value}
      className={`bae-form-control bg-body-bg text-dark rounded py-4 border-0 ${className}`}
      size={size}
      placeholder={placeholder}
      {...rest}
    />
  );
};

BaeFormControl.defaultProps = {
  type: "text",
  size: "lg",
};

export default BaeFormControl;
