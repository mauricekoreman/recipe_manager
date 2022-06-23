import "./text-button.styles.scss";

const TextButton = ({ text, onClick, className, icon, type = "button" }) => (
  <button type={type} className={`${className} text-button`} onClick={onClick}>
    {icon}
    {text}
  </button>
);

export default TextButton;
