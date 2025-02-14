import PropTypes from "prop-types";
import React from "react";

const ReusableInput = React.memo(
  ({ value, onChange, placeholder, type, className, style, ...props }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        style={style}
        {...props}
      />
    );
  }
);

ReusableInput.displayName = "ReusableInput";

ReusableInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

ReusableInput.defaultProps = {
  placeholder: "",
  type: "text",
  className: "",
  style: {},
};

export default ReusableInput;
