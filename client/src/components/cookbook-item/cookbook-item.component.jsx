import { useEffect } from "react";
import { FiBookOpen, FiBook } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { NavLink, useMatch } from "react-router-dom";

import { setCurrentCookbook } from "../../redux/cookbooksSlice";

import "./cookbook-item.styles.scss";

const CookbookItem = ({ title, cookbookArrIndex, allRecipes = false }) => {
  const linkTitle = title.split(" ").join("-");
  const dispatch = useDispatch();

  const match = useMatch(`/${linkTitle}`);

  useEffect(() => {
    if (match) {
      dispatch(setCurrentCookbook(cookbookArrIndex));
    }
  }, [match]);

  return (
    <li className='cookbookitem'>
      <NavLink
        to={`/${linkTitle}`}
        className={({ isActive }) =>
          isActive ? "cookbookitem__link cookbookitem__link--active" : "cookbookitem__link"
        }
      >
        {match ? (
          <FiBookOpen className='cookbookitem__icon' />
        ) : (
          <FiBook className='cookbookitem__icon' />
        )}
        <p className='cookbookitem__name'>{title}</p>
      </NavLink>
    </li>
  );
};

export default CookbookItem;
