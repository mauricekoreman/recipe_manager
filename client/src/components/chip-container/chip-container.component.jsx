import Chip from "../chip/chip.component";

import "./chip-container.styles.scss";

const ChipContainer = ({ chipArr, onCheck, name, checkedArr = [] }) => (
  <div className='chip__container'>
    {chipArr.map((el, i) => {
      if (checkedArr.includes(el)) {
        return <Chip name={name} key={i} checked onCheck={onCheck} text={el} />;
      } else {
        return <Chip name={name} key={i} onCheck={onCheck} text={el} />;
      }
    })}
  </div>
);

export default ChipContainer;
