import { FiSettings, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "../../redux/authSlice";
import { createCookbook, getCookbooks, reset } from "../../redux/cookbooksSlice";

import Input from "../input/input.component";
import CookbookItem from "../cookbook-item/cookbook-item.component";

import "./menubar.styles.scss";
import { useEffect, useState } from "react";

const Menubar = () => {
  const [cookbookTitle, setCookbookTitle] = useState("");

  const dispatch = useDispatch();
  const { cookbooks, isError, message } = useSelector((state) => state.cookbooks);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createCookbook({ title: cookbookTitle }));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [dispatch, cookbooks, isError, message]);

  // Getting user cookbooks
  useEffect(() => {
    dispatch(getCookbooks());
  }, []);

  return (
    <aside className='menubar'>
      <Input placeholder='Search cookbooks...' />
      <ul className='cookbooks-list'>
        {cookbooks.length &&
          cookbooks.map((cookbook, i) => (
            <CookbookItem key={i} title={cookbook.title} cookbookArrIndex={i} />
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='cookbook'
          value={cookbookTitle}
          onChange={(e) => setCookbookTitle(e.target.value)}
        />
        <button type='submit'>Add cookbook</button>
      </form>
      <button onClick={() => dispatch(logout())}>Logout!</button>
      <div className='menubar__icons'>
        <FiSettings className='menubar__icon menubar__icon--settings' />
        <FiPlus className='menubar__icon menubar__icon--plus' />
      </div>
    </aside>
  );
};

export default Menubar;
