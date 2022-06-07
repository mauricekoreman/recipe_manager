import { FiPlus } from "react-icons/fi";

import "./floating-button.styles.scss";

const FloatingButton = ({ className, onClick }) => (
  <button onClick={onClick} className={`${className} floating-button`}>
    <FiPlus className='floating-button__icon' />
  </button>
);

export default FloatingButton;
