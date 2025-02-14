import PropTypes from "prop-types";

const ReusableButton = ({
  children,
  onClick,
  type,
  className,
  style,
  disabled,
  ...props
}) => {
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
};

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
