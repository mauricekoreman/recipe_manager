import "./checkbox.styles.scss";

const Checkbox = ({ label, category, value, onChange }) => (
  <label className='checkbox__label'>
    <input
      className='checkbox__input'
      onChange={onChange}
      type='checkbox'
      value={value}
      name={category ?? label}
    />
    {label}
  </label>
);

export default Checkbox;
