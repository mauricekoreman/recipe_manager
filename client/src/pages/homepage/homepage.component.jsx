import { useEffect, useState } from "react";

import Menubar from "../../components/menubar/menubar.component";
import RecipeItem from "../../components/recipe-item/recipe-item.component";

import { FiSearch, FiFilter } from "react-icons/fi";

import cookbooksService from "../../api/cookbooksService";
import { useSelector } from "react-redux";

import "./homepage.styles.scss";

const Homepage = () => {
  const { cookbooks, currentCookbook } = useSelector((state) => state.cookbooks);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      // Check if the cookbook has any recipes. If true, get retrieve them
      if (cookbooks[currentCookbook]?._id) {
        const recipes = await cookbooksService.httpGetCookbookRecipes(
          cookbooks[currentCookbook]._id
        );

        setRecipes(recipes);
      }
    }

    getRecipes();
  }, [currentCookbook]);

  return (
    <main className='homepage-container'>
      <Menubar />
      <div className='homepage-recipes'>
        <div className='homepage-recipes__header'>
          <FiSearch className='homepage-recipes__header__icon' />
          <FiFilter className='homepage-recipes__header__icon' />
        </div>
        <div className='homepage-recipes__container'>
          {recipes.map((recipe, i) => (
            <RecipeItem key={i} title={recipe.title} img={recipe.img} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Homepage;
