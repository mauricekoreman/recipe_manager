import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiFilter, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";

import ClickAwayListener from "react-click-away-listener";

import Menubar from "../../components/menubar/menubar.component";
import TextButton from "../../components/text-button/text-button.component";
import FloatingButton from "../../components/floating-button/floating-button.component";

import cookbooksService from "../../api/cookbooksService";
import { deleteCookbook } from "../../redux/cookbooksSlice";

import "./homepage.styles.scss";

Modal.setAppElement("#root");

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showFloatMenu, setShowFloatMenu] = useState(false);

  const { cookbooks, currentCookbook } = useSelector((state) => state.cookbooks);

  function toggleModal() {
    setModalIsOpen((prevState) => !prevState);
  }

  function toggleFloatMenu() {
    setShowFloatMenu((prevState) => !prevState);
  }

  function handleDeleteCookbook() {
    const cookbookId = cookbooks[currentCookbook]._id;
    dispatch(deleteCookbook(cookbookId));
    toggleModal();
  }

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
    navigate(`${location.pathname}/create-recipe`);
  }

  return (
    <main className='homepage-container'>
      <Menubar />
      <div className='homepage-recipes'>
        <div className='homepage-recipes__header'>
          <FiSearch className='homepage-recipes__header__icon' />
          <FiFilter className='homepage-recipes__header__icon' />
          <FiMoreHorizontal className='homepage-recipes__header__icon' onClick={toggleFloatMenu} />

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
        <FloatingButton onClick={addRecipe} className='add-recipe-btn' />
      </div>
      <Modal
        className={"modal"}
        overlayClassName={"modal__overlay"}
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
      >
        <h2 className='modal__header'>Are you sure you want to delete this cookbook?</h2>
        <div className='modal-button__container'>
          <TextButton
            text={"Delete"}
            className='modal-button modal-button--delete'
            onClick={handleDeleteCookbook}
          />
          <TextButton
            text={"Cancel"}
            className='modal-button modal-button--cancel'
            onClick={toggleModal}
          />
        </div>
      </Modal>
    </main>
  );
};

export default Homepage;
