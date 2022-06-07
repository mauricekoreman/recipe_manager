import Chip from "../chip/chip.component";

import "./chip-container.styles.scss";

const ChipContainer = ({ chipArr, onCheck, name }) => (
  <div className='chip__container'>
    {chipArr.map((el, i) => (
      <Chip name={name} key={i} onCheck={onCheck} text={el} />
    ))}
  </div>
);

export default ChipContainer;
