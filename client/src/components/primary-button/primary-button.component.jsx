import "./primary-button.styles.scss";

const PrimaryButton = ({ onClick, text, ...props }) => (
  <button {...props} className='primary-button' onClick={onClick}>
    {text}
  </button>
);

export default PrimaryButton;
