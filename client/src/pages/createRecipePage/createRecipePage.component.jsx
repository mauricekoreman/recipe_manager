import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getTags } from "../../redux/tagsSlice";
import { createRecipe, updateRecipe, deleteRecipe, reset } from "../../redux/recipeSlice";
import { addRecipeToCookbook } from "../../redux/cookbooksSlice";

import Input from "../../components/input/input.component";
import Checkbox from "../../components/checkbox/checkbox.component";
import CreateInputs from "../../components/create-inputs/create-inputs.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";
import ChipContainer from "../../components/chip-container/chip-container.component";

import "./createRecipePage.styles.scss";
import TextButton from "../../components/text-button/text-button.component";

const CreateRecipePage = ({ updateExistingRecipe }) => {
  let { recipeId, cookbook } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { cookbooks } = useSelector((state) => state.cookbooks);
  const { isError, isSuccess, deleteRecipeSuccess, message } = useSelector(
    (state) => state.recipes
  );
  const { kitchen, type, season, diet, main, course } = useSelector((state) => state.tags);

  const [selectedCookbooks, setSelectedCookbooks] = useState([]);
  const [recipeData, setRecipeData] = useState({
    img: "",
    title: "",
    servings: 4,
    ingredients: [{ text: "", id: nanoid() }],
    utensils: [{ text: "", id: nanoid() }],
    instructions: [{ text: "", id: nanoid() }],
    notes: [{ text: "", id: nanoid() }],
    tags: [],
  });

  const { img, title, servings, ingredients, utensils, instructions, notes, tags } = recipeData;

  useEffect(() => {
    // get all available tags from back-end for display
    dispatch(getTags());

    if (location.state?.recipeData) {
      const lr = location.state.recipeData;

      setRecipeData(() => ({
        img: lr.img,
        title: lr.title,
        servings: lr.servings,
        ingredients: lr.ingredients.map((el) => ({ text: el, id: nanoid() })),
        utensils: lr.utensils.map((el) => ({ text: el, id: nanoid() })),
        instructions: lr.utensils.map((el) => ({ text: el, id: nanoid() })),
        notes: [{ text: lr.notes, id: nanoid() }],
        tags: lr.tags,
      }));
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate(-1);
    }

    if (deleteRecipeSuccess) {
      navigate(`/${cookbook}`);
    }

    dispatch(reset());
  }, [isError, isSuccess, deleteRecipeSuccess]);

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
    let updatedTags = [...recipeData.tags];
    let ref = e.target;

    if (ref.checked) {
      updatedTags = [...recipeData.tags, ref.value];
    } else if (!ref.checked) {
      updatedTags.splice(recipeData.tags.indexOf(ref.value), 1);
    }

    setRecipeData((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  }

  function removeIds(array) {
    return array.map((obj) => obj.text);
  }

  async function onSubmit(e) {
    e.preventDefault();

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

    // Check if this page is updating an existing recipe or creating a new one.
    if (updateExistingRecipe === true) {
      // const updatedRecipe = await dispatch()
      dispatch(updateRecipe({ data: recipeDataSubmit, id: recipeId }));
    } else {
      const createdRecipe = await dispatch(createRecipe(recipeDataSubmit));

      // NOTE: maybe this should be handled in the back-end instead?
      if (selectedCookbooks.length > 0) {
        dispatch(
          addRecipeToCookbook({ cookbooks: selectedCookbooks, recipeId: createdRecipe.payload._id })
        );
      }
    }
  }

  async function submitDeleteRecipe() {
    dispatch(deleteRecipe(recipeId));
  }

  return (
    <article className='create-recipe__container'>
      <FiArrowLeft className='create-recipe__back-arrow' onClick={() => navigate(-1)} />
      <section className='create-recipe__section'>
        <h2>Recipe name*</h2>
        <Input
          onChange={(e) => setRecipeData((prevState) => ({ ...prevState, title: e.target.value }))}
          defaultValue={recipeData.title}
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
            <Checkbox onChange={handleCheckedCookbook} label={el.title} value={el._id} key={i} />
          ))}
        </div>
      </section>

      <section className='create-recipe__section'>
        <h2>Kitchen</h2>
        <ChipContainer
          onCheck={onCheck}
          checkedArr={recipeData.tags}
          chipArr={kitchen}
          name='kitchen'
        />
      </section>

      <section className='create-recipe__section'>
        <h2>Type</h2>
        <ChipContainer onCheck={onCheck} checkedArr={recipeData.tags} chipArr={type} name='type' />
      </section>

      <section className='create-recipe__section'>
        <h2>Season</h2>
        <ChipContainer
          onCheck={onCheck}
          checkedArr={recipeData.tags}
          chipArr={season}
          name='season'
        />
      </section>

      <section className='create-recipe__section'>
        <h2>Diet</h2>
        <ChipContainer onCheck={onCheck} checkedArr={recipeData.tags} chipArr={diet} name='diet' />
      </section>

      <section className='create-recipe__section'>
        <h2>Main</h2>
        <ChipContainer onCheck={onCheck} checkedArr={recipeData.tags} chipArr={main} name='main' />
      </section>

      <section className='create-recipe__section'>
        <h2>Course</h2>
        <ChipContainer
          onCheck={onCheck}
          checkedArr={recipeData.tags}
          chipArr={course}
          name='course'
        />
      </section>

      <PrimaryButton type='button' onClick={onSubmit} text={"Save recipe"} />
      {updateExistingRecipe && (
        <div className='delete-recipe'>
          <p>OR</p>
          <TextButton
            onClick={submitDeleteRecipe}
            className='delete-recipe__btn'
            text={"Delete recipe..."}
          />
        </div>
      )}
    </article>
  );
};

export default CreateRecipePage;
