import "./recipe-item.styles.scss";

const RecipeItem = () => (
  <div className='recipe-item'>
    {/* <div style={{ height: "100%", width: "100%" }}></div> */}
    <img className='recipe-item__img' src='https://picsum.photos/200' />
    <p className='recipe-item__name'>Lekker gerecht</p>
  </div>
);

export default RecipeItem;
