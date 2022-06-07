import "./checkbox.styles.scss";

const Checkbox = ({ name, value, onChange }) => (
  <label className='checkbox__label'>
    <input
      className='checkbox__input'
      onChange={onChange}
      type='checkbox'
      value={value}
      name={name}
    />
    {name}
  </label>
);

export default Checkbox;
