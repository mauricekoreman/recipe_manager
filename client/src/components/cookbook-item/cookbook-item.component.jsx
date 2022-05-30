import { FiBookOpen, FiBook } from "react-icons/fi";

import "./cookbook-item.styles.scss";

const CookbookItem = () => (
  <li className='cookbookitem'>
    <FiBook className='cookbookitem__icon' />
    <p className='cookbookitem__name'>Breakfast</p>
  </li>
);

export default CookbookItem;
