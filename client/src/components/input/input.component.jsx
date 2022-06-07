import "./input.styles.scss";

const Input = ({ label, className, textArea = false, ...props }) => (
  <div className={`${className} input`}>
    {label && <label className='input__label'>{label}</label>}
    {textArea ? (
      <textarea className='input__input input__input--textarea' {...props} />
    ) : (
      <input className='input__input' {...props} />
    )}
  </div>
);

export default Input;
