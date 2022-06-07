import { useOutletContext } from "react-router-dom";

import RecipeItem from "../recipe-item/recipe-item.component";

import "./recipes-grid-container.styles.scss";

const RecipesGridContainer = () => {
  const recipes = useOutletContext();

  return (
    <div className='homepage-recipes__container'>
      {recipes.map((recipe, i) => (
        <RecipeItem key={i} title={recipe.title} img={recipe.img} />
      ))}
    </div>
  );
};

export default RecipesGridContainer;
