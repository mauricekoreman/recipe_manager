import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronRight } from "react-icons/fi";

import { getTags } from "../../redux/tagsSlice";
import CheckboxList from "../checkbox-list/checkbox-list.component";

import "./filter-menu.styles.scss";
import {
  getUserFilteredRecipes,
  getCookbookRecipes,
  getUserRecipes,
  getCookbookFilteredRecipes,
} from "../../redux/recipeSlice";

const FilterMenu = ({ show, toggle }) => {
  const dispatch = useDispatch();
  const { kitchen, type, season, diet, main, course } = useSelector((state) => state.tags);
  const { cookbooks, currentCookbook } = useSelector((state) => state.cookbooks);
  const [filter, setFilter] = useState([]);

  function onCheck(e) {
    let updatedTags = [...filter];
    let ref = e.target;

    if (ref.checked) {
      updatedTags = [...filter, ref.value];
    } else if (!ref.checked) {
      updatedTags.splice(filter.indexOf(ref.value), 1);
    }

    setFilter(updatedTags);
  }

  function applyFilters() {
    if (filter.length > 0) {
      currentCookbook !== null
        ? dispatch(
            getCookbookFilteredRecipes({
              tags: filter.join(","),
              cookbookId: cookbooks[currentCookbook]._id,
            })
          )
        : dispatch(getUserFilteredRecipes(filter.join(",")));
    } else {
      if (cookbooks[currentCookbook]?._id) {
        dispatch(getCookbookRecipes(cookbooks[currentCookbook]._id));
      } else if (currentCookbook === null) {
        dispatch(getUserRecipes());
      }
    }
  }

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <aside className={`filter__container ${show && "filter__container--show"}`}>
      <div className='filter__heading'>
        <h1 onClick={toggle}>Filter</h1>
        <FiChevronRight onClick={toggle} />
        <button className='filter__apply-btn' onClick={applyFilters}>
          Apply
        </button>
      </div>

      <div className='filter__filters'>
        <h2>By kitchen</h2>
        <CheckboxList
          checkedItems={filter}
          itemCheck={onCheck}
          data={kitchen}
          category={"kitchen"}
        />

        <h2>By type</h2>
        <CheckboxList checkedItems={filter} itemCheck={onCheck} data={type} category={"type"} />

        <h2>By season</h2>
        <CheckboxList checkedItems={filter} itemCheck={onCheck} data={season} category={"season"} />

        <h2>By diet</h2>
        <CheckboxList checkedItems={filter} itemCheck={onCheck} data={diet} category={"diet"} />

        <h2>By main</h2>
        <CheckboxList checkedItems={filter} itemCheck={onCheck} data={main} category={"main"} />

        <h2>By course</h2>
        <CheckboxList checkedItems={filter} itemCheck={onCheck} data={course} category={"course"} />
      </div>
    </aside>
  );
};

export default FilterMenu;
