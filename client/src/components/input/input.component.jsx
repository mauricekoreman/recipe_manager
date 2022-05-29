import "./input.styles.scss";

const Input = ({ label, ...props }) => (
  <div className='input'>
    <label className='input__label'>{label}</label>
    <input className='input__input' {...props} />
  </div>
);

export default Input;
