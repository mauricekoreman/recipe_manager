import { FiSettings, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";

import Input from "../input/input.component";
import CookbookItem from "../cookbook-item/cookbook-item.component";

import "./menubar.styles.scss";

const Menubar = () => {
  const dispatch = useDispatch();

  return (
    <aside className='menubar'>
      <Input placeholder='Search cookbooks...' />
      <ul className='cookbooks-list'>
        <CookbookItem />
        <CookbookItem />
        <CookbookItem />
      </ul>
      <button onClick={() => dispatch(logout())}>Logout!</button>
      <div className='menubar__icons'>
        <FiSettings className='menubar__icon menubar__icon--settings' />
        <FiPlus className='menubar__icon menubar__icon--plus' />
      </div>
    </aside>
  );
};

export default Menubar;
