import "./text-button.styles.scss";

const TextButton = ({ text, loading, onClick, className, icon, type = "button" }) => (
  <button disabled={loading} type={type} className={`${className} text-button`} onClick={onClick}>
    {icon}
    {text}
  </button>
);

export default TextButton;
