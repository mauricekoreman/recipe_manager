import "./ingredients-box.styles.scss";

const IngredientsBox = ({ servings = 4, ingredients = [], utensils = [], tags }) => (
  <aside className='ingredients-box'>
    <h2 className='ingredients-box__heading'>Ingredients</h2>
    <p className='ingredients-box__servings'>
      Serves <b>{servings}</b> people
    </p>
    <ul className='ingredients-box__list'>
      {ingredients.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
    <ul className='ingredients-box__list ingredients-box__list--utensils'>
      {utensils.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
    <div className='ingredients-box__tags-container'>
      {Object.entries(tags).map((tagType) =>
        tagType[1].map((tag) => (
          <p className='ingredients-box__tags-container__chip' key={tag}>
            {tag}
          </p>
        ))
      )}
    </div>
  </aside>
);

export default IngredientsBox;
