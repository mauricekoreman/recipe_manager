import "./text-button.styles.scss";

const TextButton = ({ text, onClick, className, icon }) => (
  <button type='button' className={`${className} text-button`} onClick={onClick}>
    {icon}
    {text}
  </button>
);

export default TextButton;
