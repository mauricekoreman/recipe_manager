import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Homepage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>This is the homepage!</h1>
      <button onClick={() => dispatch(logout())}>Logout!</button>
    </div>
  );
};

export default Homepage;
