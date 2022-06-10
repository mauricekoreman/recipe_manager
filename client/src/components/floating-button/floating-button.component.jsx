import "./floating-button.styles.scss";

const FloatingButton = ({ className, onClick, icon }) => (
  <button onClick={onClick} className={`${className} floating-button`}>
    {icon}
  </button>
);

export default FloatingButton;
