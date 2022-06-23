import "./modal.styles.scss";

const Modal = ({ backdropClick, header, children }) => {
  return (
    <div className='modal'>
      <div onClick={backdropClick} className='modal__backdrop'></div>
      <div className='modal__block'>
        <h2 className='modal__header'>{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
