import "./text-button.styles.scss";

const TextButton = ({ text, onClick, className }) => (
  <button className={`${className} text-button`} onClick={onClick}>
    {text}
  </button>
);

export default TextButton;
