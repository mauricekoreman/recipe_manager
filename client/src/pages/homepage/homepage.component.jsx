import { useSelector } from "react-redux";

import Menubar from "../../components/menubar/menubar.component";
import RecipeItem from "../../components/recipe-item/recipe-item.component";

import { FiSearch, FiFilter } from "react-icons/fi";

import "./homepage.styles.scss";

const Homepage = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <main className='homepage-container'>
      <Menubar />
      <div className='homepage-recipes'>
        <div className='homepage-recipes__header'>
          <FiSearch className='homepage-recipes__header__icon' />
          <FiFilter className='homepage-recipes__header__icon' />
        </div>
        <div className='homepage-recipes__container'>
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
        </div>
      </div>
    </main>
  );
};

export default Homepage;
