import { useEffect, useState } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import recipeService from "../../api/recipeService";
import FloatingButton from "../../components/floating-button/floating-button.component";
import IngredientsBox from "../../components/ingredients-box/ingredients-box.component";

import placeholder from "../../assets/img/noodles-with-bg.svg";

import "./readRecipePage.styles.scss";

const ReadRecipePage = () => {
  let { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    title: "",
    createdBy: "",
    img: "",
    servings: 4,
    notes: "",
    ingredients: [],
    utensils: [],
    instructions: [],
    tags: {
      course: [],
      kitchen: [],
      main: [],
      diet: [],
      season: [],
      type: [],
    },
  });

  const { title, img, servings, notes, ingredients, utensils, instructions, tags } = recipeData;

  // Find recipe from express server with recipeId
  useEffect(() => {
    async function fetchRecipeData() {
      const response = await recipeService.httpGetRecipeById(recipeId);

      setRecipeData(response);
    }

    fetchRecipeData();
  }, [recipeId]);

  function handleBackArrow() {
    navigate(-1);
  }

  function handleEditRecipeBtn() {
    navigate("./edit");
  }

  return (
    <main className='read-recipe'>
      <FiArrowLeft className='read-recipe__back-arrow' onClick={handleBackArrow} />
      <h1 className='read-recipe__heading'>{title}</h1>
      <IngredientsBox
        servings={servings}
        ingredients={ingredients}
        utensils={utensils}
        tags={tags}
      />
      <article>
        <img className='read-recipe__img' src={img === "" ? placeholder : img} />
        <h2 className='read-recipe__heading--sub'>Instructions</h2>
        {instructions.map((el, i) => (
          <div key={i} className='read-recipe__instruction'>
            <div>
              <span>{i + 1}</span>
            </div>
            <p>{el}</p>
          </div>
        ))}
        <h2 className='read-recipe__heading--sub'>Notes</h2>
        <p className='read-recipe__instruction'>{notes}</p>
      </article>
      <FloatingButton icon={<FiEdit2 />} onClick={handleEditRecipeBtn} />
    </main>
  );
};

export default ReadRecipePage;
