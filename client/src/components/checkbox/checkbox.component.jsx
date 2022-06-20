import "./checkbox.styles.scss";

const Checkbox = ({ label, category, value, onChange, checked = false }) => (
  <label className='checkbox__label'>
    <input
      checked={checked}
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
