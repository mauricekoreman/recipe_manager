import { nanoid } from "nanoid";

import "./chip.styles.scss";

const Chip = ({ text, onCheck, name }) => {
  const chipId = nanoid();

  return (
    <div className='chip chip-checkbox'>
      <input name={name} value={text} onChange={onCheck} id={chipId} type='checkbox' />
      <label htmlFor={chipId}>{text}</label>
    </div>
  );
};

export default Chip;
