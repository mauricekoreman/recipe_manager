import { useNavigate, useOutletContext } from "react-router-dom";

import RecipeItem from "../recipe-item/recipe-item.component";

import cookingWoman from "../../assets/img/cooking-woman.svg";

import "./recipes-grid-container.styles.scss";

const RecipesGridContainer = () => {
  const recipes = useOutletContext();
  const navigate = useNavigate();

  function handleRecipeClick(recipeData) {
    navigate(`./recipe/${recipeData._id}`);
  }

  if (recipes.length > 0) {
    return (
      <div className='homepage-recipes__container'>
        {recipes.map((recipe, i) => (
          <RecipeItem
            key={i}
            title={recipe.title}
            img={recipe.img}
            onClick={() => handleRecipeClick(recipe)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className='homepage-recipes__no-recipes'>
        <img className='homepage-recipes__no-recipes__img' src={cookingWoman} />;
        <h1>Create your first recipe!</h1>
      </div>
    );
  }
};

export default RecipesGridContainer;
