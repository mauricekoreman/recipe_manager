import "./checkbox.styles.scss";

const Checkbox = ({ inputValue, onChange }) => (
  <label className='checkbox__label'>
    <input
      className='checkbox__input'
      onChange={onChange}
      type='checkbox'
      value={inputValue}
      name={inputValue}
    />
    {inputValue}
  </label>
);

export default Checkbox;
