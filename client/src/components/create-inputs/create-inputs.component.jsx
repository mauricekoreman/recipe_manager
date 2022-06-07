import { FiX } from "react-icons/fi";
import { nanoid } from "nanoid";

import Input from "../input/input.component";
import TextButton from "../text-button/text-button.component";

import "./create-inputs.styles.scss";

const CreateInputs = ({
  label,
  inputArr,
  setInputArr,
  addButtonText,
  category,
  count = false,
  textArea = false,
}) => {
  function onElementChange(e, id) {
    const updatedElements = [...inputArr];
    const objIndex = updatedElements.findIndex((el) => el.id === id);
    updatedElements[objIndex].text = e;
    setInputArr(updatedElements, category);
  }

  function removeElement(id) {
    const newArr = inputArr.filter((el) => el.id !== id);
    setInputArr(newArr, category);
  }

  function addElement() {
    const newEl = {
      text: "",
      id: nanoid(),
    };

    setInputArr(inputArr, category, newEl);
  }

  return (
    <section className='create-recipe__section'>
      <h2>{label}</h2>
      {inputArr.map((el, i) => (
        <div key={el.id} className='create-recipe__input-container'>
          {count && (
            <div className='create-recipe__input-step'>
              <span>{i + 1}</span>
            </div>
          )}
          <Input
            name={label}
            className='create-recipe__input'
            defaultValue={el.text}
            onChange={(e) => onElementChange(e.target.value, el.id)}
            textArea={textArea}
          />
          {inputArr.length > 1 && (
            <FiX onClick={() => removeElement(el.id)} className='create-recipe__input--remove' />
          )}
        </div>
      ))}
      {addButtonText && (
        <TextButton onClick={addElement} className={"add-input"} text={addButtonText} />
      )}
    </section>
  );
};

export default CreateInputs;
