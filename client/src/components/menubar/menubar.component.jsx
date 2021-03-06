import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { createCookbook, getCookbooks, reset } from "../../redux/cookbooksSlice";

import Input from "../input/input.component";
import CookbookItem from "../cookbook-item/cookbook-item.component";

import "./menubar.styles.scss";

const Menubar = () => {
  const navigate = useNavigate();
  const [cookbookTitle, setCookbookTitle] = useState("");
  const [addCookbook, setAddCookbook] = useState(false);
  const [cookbookQuery, setCookbookQuery] = useState("");
  const [filteredCookbooks, setFilteredCookbooks] = useState([]);

  const listRef = useRef();

  const dispatch = useDispatch();
  const { cookbooks, isError, message, isSuccess } = useSelector((state) => state.cookbooks);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createCookbook({ title: cookbookTitle }));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      setAddCookbook(false);
    }

    dispatch(reset());
  }, [dispatch, cookbooks, isError, message, isSuccess]);

  useEffect(() => {
    if (addCookbook) {
      listRef.current.scroll({
        top: listRef.current.scrollHeight,
      });
    }
  }, [addCookbook]);

  useEffect(() => {
    const searchedCookbooks = cookbooks.filter((cookbook) =>
      cookbook.title.toLowerCase().includes(cookbookQuery.toLowerCase())
    );

    setFilteredCookbooks(searchedCookbooks);
  }, [cookbookQuery, cookbooks]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Escape") {
        setAddCookbook(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  // Getting user cookbooks
  useEffect(() => {
    dispatch(getCookbooks());
  }, []);

  return (
    <aside className='menubar'>
      <Input
        className='menubar__search'
        placeholder='Search cookbooks...'
        onChange={(e) => setCookbookQuery(e.target.value)}
      />
      <ul className='cookbooks-list' ref={listRef}>
        <CookbookItem title={"All recipes"} allRecipes cookbookArrIndex={null} />
        {filteredCookbooks.length > 0 &&
          filteredCookbooks.map((cookbook, i) => (
            <CookbookItem key={i} title={cookbook.title} cookbookArrIndex={i} />
          ))}

        {addCookbook && (
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type='text'
              name='cookbook'
              value={cookbookTitle}
              onChange={(e) => setCookbookTitle(e.target.value)}
              className='addCookbook__input'
            />
            <button
              type='button'
              onClick={() => setAddCookbook(false)}
              className='addCookbook__cancel-btn'
            >
              x
            </button>
            <button className='addCookbook__add-btn' type='submit'>
              Add cookbook
            </button>
          </form>
        )}
      </ul>
      <div className='menubar__icons'>
        <FiSettings
          className='menubar__icon menubar__icon--settings'
          onClick={() => navigate("/settings")}
        />
        <FiPlus
          className='menubar__icon menubar__icon--plus'
          onClick={() => setAddCookbook(true)}
        />
      </div>
    </aside>
  );
};

export default Menubar;
