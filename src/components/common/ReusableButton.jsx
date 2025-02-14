import PropTypes from "prop-types";
import React from "react";

const ReusableButton = React.memo(
  ({ children, onClick, type, className, style, disabled, ...props }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={className}
        style={style}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ReusableButton.displayName = "ReusableButton";
ReusableButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

ReusableButton.defaultProps = {
  type: "button",
  className: "",
  style: {},
  disabled: false,
};

export default ReusableButton;
