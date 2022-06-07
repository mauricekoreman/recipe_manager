import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getTags } from "../../redux/tagsSlice";

import CreateInputs from "../../components/create-inputs/create-inputs.component";
import Input from "../../components/input/input.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";
import Checkbox from "../../components/checkbox/checkbox.component";
import ChipContainer from "../../components/chip-container/chip-container.component";

import "./createRecipePage.styles.scss";
import { createRecipe } from "../../redux/recipeSlice";

const CreateRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cookbooks } = useSelector((state) => state.cookbooks);
  const { kitchen, type, season, diet, main, course } = useSelector((state) => state.tags);

  useEffect(() => {
    // get all available tags from back-end for display
    dispatch(getTags());
  }, []);

  const [selectedCookbooks, setSelectedCookbooks] = useState([]);
  const [recipeData, setRecipeData] = useState({
    img: "",
    title: "",
    servings: 4,
    ingredients: [{ text: "", id: nanoid() }],
    utensils: [{ text: "", id: nanoid() }],
    instructions: [{ text: "", id: nanoid() }],
    notes: [{ text: "", id: nanoid() }],
    tags: {
      kitchen: [],
      type: [],
      season: [],
      diet: [],
      main: [],
      course: [],
    },
  });

  const { img, title, servings, ingredients, utensils, instructions, notes, tags } = recipeData;

  function onRecipeChange(updatedArr, category, newEl) {
    if (newEl) {
      // If a new element is added
      setRecipeData((prevState) => ({
        ...prevState,
        [category]: [...updatedArr, newEl],
      }));
    } else {
      // If element data is changed
      setRecipeData((prevState) => ({
        ...prevState,
        [category]: updatedArr,
      }));
    }
  }

  function handleCheckedCookbook(e) {
    let updatedList = [...selectedCookbooks];
    if (e.target.checked) {
      updatedList = [...selectedCookbooks, e.target.value];
    } else {
      updatedList.splice(selectedCookbooks.indexOf(e.target.value), 1);
    }

    setSelectedCookbooks(updatedList);
  }

  function onCheck(e) {
    let updatedTags = Object.assign({}, recipeData.tags);
    let ref = e.target;

    if (ref.checked) {
      updatedTags[ref.name] = [...recipeData.tags[ref.name], ref.value];
    } else if (!ref.checked) {
      updatedTags[ref.name].splice(recipeData.tags[ref.name].indexOf(ref.value), 1);
    }

    setRecipeData((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  }

  function removeIds(array) {
    return array.map((obj) => obj.text);
  }

  function onSubmit(e) {
    e.preventDefault();

    // TODO: form validation

    const recipeDataSubmit = {
      img,
      title,
      servings,
      ingredients: removeIds(ingredients),
      utensils: removeIds(utensils),
      instructions: removeIds(instructions),
      notes: removeIds(notes)[0],
      tags,
    };

    dispatch(createRecipe(recipeDataSubmit));
    navigate(-1);
  }

  return (
    <article className='create-recipe__container'>
      <div>
        <section className='create-recipe__section'>
          <h2>Recipe name*</h2>
          <Input
            onChange={(e) =>
              setRecipeData((prevState) => ({ ...prevState, title: e.target.value }))
            }
            placeholder={"Recipe name..."}
          />
        </section>

        <CreateInputs
          label={"Ingredients"}
          inputArr={recipeData.ingredients}
          setInputArr={onRecipeChange}
          addButtonText={"+ Add ingredient"}
          category={"ingredients"}
        />

        <CreateInputs
          label={"Utensils"}
          inputArr={recipeData.utensils}
          setInputArr={onRecipeChange}
          addButtonText={"+ Add utensil"}
          category={"utensils"}
        />
        <CreateInputs
          label={"Instructions"}
          inputArr={recipeData.instructions}
          setInputArr={onRecipeChange}
          addButtonText={"+ Add Instruction"}
          category={"instructions"}
          count={true}
          textArea={true}
        />

        <CreateInputs
          label={"Notes"}
          inputArr={recipeData.notes}
          setInputArr={onRecipeChange}
          category={"notes"}
          textArea={true}
        />

        <section className='create-recipe__section'>
          <h2>Add to cookbooks</h2>
          <div className='checkbox__container'>
            {cookbooks.map((el, i) => (
              <Checkbox onChange={handleCheckedCookbook} inputValue={el.title} key={i} />
            ))}
          </div>
        </section>

        <section className='create-recipe__section'>
          <h2>Kitchen</h2>
          <ChipContainer onCheck={onCheck} chipArr={kitchen} name='kitchen' />
        </section>

        <section className='create-recipe__section'>
          <h2>Type</h2>
          <ChipContainer onCheck={onCheck} chipArr={type} name='type' />
        </section>

        <section className='create-recipe__section'>
          <h2>Season</h2>
          <ChipContainer onCheck={onCheck} chipArr={season} name='season' />
        </section>

        <section className='create-recipe__section'>
          <h2>Diet</h2>
          <ChipContainer onCheck={onCheck} chipArr={diet} name='diet' />
        </section>

        <section className='create-recipe__section'>
          <h2>Main</h2>
          <ChipContainer onCheck={onCheck} chipArr={main} name='main' />
        </section>

        <section className='create-recipe__section'>
          <h2>Course</h2>
          <ChipContainer onCheck={onCheck} chipArr={course} name='course' />
        </section>

        <PrimaryButton type='button' onClick={onSubmit} text={"Save recipe"} />
      </div>
    </article>
  );
};

export default CreateRecipePage;
