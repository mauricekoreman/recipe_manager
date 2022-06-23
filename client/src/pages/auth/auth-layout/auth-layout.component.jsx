import { Link } from "react-router-dom";
import LandingHeading from "../../../components/landing-heading/landing-heading.component";
import PrimaryButton from "../../../components/primary-button/primary-button.component";

import "./auth-layout.styles.scss";

const AuthLayout = ({
  titleTop,
  onSubmit,
  buttonText,
  navigateText,
  navigateActionText,
  navigateTo,
  children,
}) => (
  <div className='auth'>
    <LandingHeading top={titleTop} title="Let's Cook It!" />
    <form className='auth__form' onSubmit={onSubmit}>
      {children}
      <PrimaryButton type='submit' text={buttonText} />
    </form>
    <p className='auth__link__container'>
      {navigateText + " "}
      <Link className='auth__link' to={navigateTo}>
        {navigateActionText}
      </Link>
    </p>
    <Link className='auth__link' to={"/password/requestReset"}>
      Forgot your password?
    </Link>
  </div>
);

export default AuthLayout;
