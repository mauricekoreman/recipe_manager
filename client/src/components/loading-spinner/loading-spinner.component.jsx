import "./loading-spinner.styles.scss";

const LoadingSpinner = () => (
  <div className='loading-spinner'>
    <div className='loading-bounce loading-bounce--1'></div>
    <div className='loading-bounce loading-bounce--2'></div>
    <div className='loading-bounce loading-bounce--3'></div>
  </div>
);

export default LoadingSpinner;
