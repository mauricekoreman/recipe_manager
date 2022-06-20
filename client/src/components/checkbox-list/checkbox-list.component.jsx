import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

import Checkbox from "../checkbox/checkbox.component";

import "./checkbox-list.styles.scss";

const CheckboxList = ({ data = [], checkedItems = [], itemCheck, category }) => {
  const [expanded, setExpanded] = useState(false);

  // Sorting array on alphabetical
  const sortedArr = [...data].sort();

  const itemsForDisplay = expanded ? sortedArr : sortedArr.slice(0, 3);

  return (
    <>
      {itemsForDisplay.map((el, i) => (
        <Checkbox
          checked={checkedItems.includes(el)}
          onChange={itemCheck}
          key={el + i}
          label={el}
          category={category}
          value={el}
        />
      ))}
      <p className='checkbox__show-btn' onClick={() => setExpanded((prevState) => !prevState)}>
        {expanded ? <FiMinus /> : <FiPlus />}
        {expanded ? "show less" : "show all"}
      </p>
    </>
  );
};

export default CheckboxList;
