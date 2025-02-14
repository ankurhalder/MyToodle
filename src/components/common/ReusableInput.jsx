import PropTypes from "prop-types";

const ReusableInput = ({
  value,
  onChange,
  placeholder,
  type,
  className,
  style,
  ...props
}) => {
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
};

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
