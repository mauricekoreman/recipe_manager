import "./recipe-item.styles.scss";

import placeholder from "../../assets/img/noodles-with-bg.svg";

const RecipeItem = ({ img, title }) => (
  <div className='recipe-item'>
    <img className='recipe-item__img' src={img === "" ? placeholder : img} />
    <p className='recipe-item__name'>{title}</p>
  </div>
);

export default RecipeItem;
