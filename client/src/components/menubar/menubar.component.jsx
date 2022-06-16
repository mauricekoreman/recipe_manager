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

  // Getting user cookbooks
  useEffect(() => {
    dispatch(getCookbooks());
  }, []);

  return (
    <aside className='menubar'>
      <Input className='menubar__search' placeholder='Search cookbooks...' />
      <ul className='cookbooks-list' ref={listRef}>
        <CookbookItem title={"All recipes"} allRecipes cookbookArrIndex={null} />
        {cookbooks.length > 0 &&
          cookbooks.map((cookbook, i) => (
            <CookbookItem key={i} title={cookbook.title} cookbookArrIndex={i} />
          ))}

        {addCookbook && (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='cookbook'
              value={cookbookTitle}
              onChange={(e) => setCookbookTitle(e.target.value)}
              className='addCookbook__input'
            />
            <button onClick={() => setAddCookbook(false)} className='addCookbook__cancel-btn'>
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
