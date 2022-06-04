import "./recipe-item.styles.scss";

const RecipeItem = ({ img, title }) => (
  <div className='recipe-item'>
    <img className='recipe-item__img' src={img} />
    <p className='recipe-item__name'>{title}</p>
  </div>
);

export default RecipeItem;
