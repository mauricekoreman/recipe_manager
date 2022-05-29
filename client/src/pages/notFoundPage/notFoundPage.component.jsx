import { useNavigate } from "react-router-dom";
import LandingHeading from "../../components/landing-heading/landing-heading.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LandingHeading title={"Page Not Found!"} />
      <PrimaryButton text={"Go to homepage!"} onClick={() => navigate("/")} />
    </>
  );
};

export default NotFoundPage;
