import "./landing-heading.styles.scss";

const LandingHeading = ({ top, title }) => (
  <div className='landing-heading'>
    <span className='landing-heading__top'>{top}</span>
    <h1 className='landing-heading__text'>{title}</h1>
  </div>
);

export default LandingHeading;
