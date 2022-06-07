import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Menubar from "../../components/menubar/menubar.component";
import FloatingButton from "../../components/floating-button/floating-button.component";

import { FiSearch, FiFilter } from "react-icons/fi";

import cookbooksService from "../../api/cookbooksService";
import { useSelector } from "react-redux";

import "./homepage.styles.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Homepage = () => {
  const { cookbooks, currentCookbook } = useSelector((state) => state.cookbooks);
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      // Check if the cookbook has any recipes. If true, get retrieve them
      if (cookbooks[currentCookbook]?._id) {
        // NOTE: eigenlijk onnodig. Ik haal de recipes al op bij getCookbooks. Dus alle data staat al in redux...
        const recipes = await cookbooksService.httpGetCookbookRecipes(
          cookbooks[currentCookbook]._id
        );

        setRecipes(recipes);
      }
    }

    getRecipes();
  }, [currentCookbook]);

  function addRecipe() {
    console.log(location.pathname);
    navigate(`${location.pathname}/create-recipe`);
  }

  return (
    <main className='homepage-container'>
      <Menubar />
      <div className='homepage-recipes'>
        <div className='homepage-recipes__header'>
          <FiSearch className='homepage-recipes__header__icon' />
          <FiFilter className='homepage-recipes__header__icon' />
        </div>

        <Outlet context={recipes} />
        <FloatingButton onClick={addRecipe} className='add-recipe-btn' />
      </div>
    </main>
  );
};

export default Homepage;
