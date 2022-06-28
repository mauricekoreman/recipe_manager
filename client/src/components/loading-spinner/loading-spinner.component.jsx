import "./loading-spinner.styles.scss";

const LoadingSpinner = ({ color }) => {
  const styles = {
    backgroundColor: color || "#FFF",
  };

  return (
    <div className='loading-spinner'>
      <div style={styles} className='loading-bounce loading-bounce--1'></div>
      <div style={styles} className='loading-bounce loading-bounce--2'></div>
      <div style={styles} className='loading-bounce loading-bounce--3'></div>
    </div>
  );
};

export default LoadingSpinner;
