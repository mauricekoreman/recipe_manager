import "./primary-button.styles.scss";

const PrimaryButton = ({ onClick, text, className, ...props }) => (
  <button {...props} className={`${className} primary-button`} onClick={onClick}>
    {text}
  </button>
);

export default PrimaryButton;
