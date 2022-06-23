import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiFilter, FiMoreHorizontal, FiTrash2, FiPlus } from "react-icons/fi";

import ClickAwayListener from "react-click-away-listener";

import Menubar from "../../components/menubar/menubar.component";
import TextButton from "../../components/text-button/text-button.component";
import FloatingButton from "../../components/floating-button/floating-button.component";

import { deleteCookbook } from "../../redux/cookbooksSlice";
import { getCookbookRecipes, getUserRecipes, reset } from "../../redux/recipeSlice";

import "./homepage.styles.scss";
import Input from "../../components/input/input.component";
import FilterMenu from "../../components/filter-menu/filter-menu.component";
import Modal from "../../components/modal/modal.component";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showFloatMenu, setShowFloatMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const { currentCookbookRecipes, isError, isSuccess, message } = useSelector(
    (state) => state.recipes
  );
  const { cookbooks, currentCookbook } = useSelector((state) => state.cookbooks);

  function toggleModal() {
    setShowModal((prevState) => !prevState);
  }

  function toggleFloatMenu() {
    setShowFloatMenu((prevState) => !prevState);
  }

  function toggleFilterMenu() {
    setShowFilterMenu((prevState) => !prevState);
  }

  function handleDeleteCookbook() {
    const cookbookId = cookbooks[currentCookbook]._id;
    dispatch(deleteCookbook(cookbookId));
    toggleModal();
    navigate("/");
  }

  function addRecipe() {
    navigate(`${location.pathname}/create-recipe`);
  }

  useEffect(() => {
    const searchedRecipes = currentCookbookRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    setRecipes(searchedRecipes);
  }, [query, currentCookbookRecipes]);

  useEffect(() => {
    async function getRecipes() {
      if (cookbooks[currentCookbook]?._id) {
        dispatch(getCookbookRecipes(cookbooks[currentCookbook]._id));
      } else if (currentCookbook === null) {
        dispatch(getUserRecipes());
      }
    }

    getRecipes();
  }, [currentCookbook]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  return (
    <main className='homepage-container'>
      <Menubar />
      <div className='homepage-recipes'>
        <div className='homepage-recipes__header'>
          <Input
            className='homepage-recipes__search'
            placeholder='Search recipes...'
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiFilter className='homepage-recipes__header__icon' onClick={toggleFilterMenu} />
          {currentCookbook !== null && (
            <FiMoreHorizontal
              className='homepage-recipes__header__icon'
              onClick={toggleFloatMenu}
            />
          )}

          {showFloatMenu && (
            <ClickAwayListener onClickAway={toggleFloatMenu}>
              <div className='floating-menu floating-menu--homepage'>
                <TextButton
                  className='floating-menu__button'
                  text={"Delete cookbook"}
                  icon={<FiTrash2 />}
                  onClick={toggleModal}
                />
              </div>
            </ClickAwayListener>
          )}
        </div>

        <Outlet context={recipes} />
        <FloatingButton onClick={addRecipe} icon={<FiPlus />} />
      </div>
      <FilterMenu show={showFilterMenu} toggle={toggleFilterMenu} />
      {showModal && (
        <Modal backdropClick={toggleModal} header='Are you sure you want to delete this cookbooks?'>
          <div className='modal-button__container'>
            <TextButton
              text='Delete'
              className='modal-button modal-button--delete'
              onClick={handleDeleteCookbook}
            />
            <TextButton
              text='Cancel'
              className='modal-button modal-button--cancel'
              onClick={toggleModal}
            />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Homepage;
