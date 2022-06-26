import LoadingSpinner from "../loading-spinner/loading-spinner.component";
import "./primary-button.styles.scss";

const PrimaryButton = ({ onClick, text, className, loading = false, ...props }) => (
  <button disabled={loading} {...props} className={`${className} primary-button`} onClick={onClick}>
    {loading ? <LoadingSpinner size='2.7rem' /> : text}
  </button>
);

export default PrimaryButton;
