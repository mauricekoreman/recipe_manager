import LandingHeading from "../../../components/landing-heading/landing-heading.component";
import PrimaryButton from "../../../components/primary-button/primary-button.component";

import "./auth-layout.styles.scss";

const AuthLayout = ({
  titleTop,
  onSubmit,
  buttonText,
  navigateText,
  navigateActionText,
  children,
}) => (
  <div className='auth'>
    <LandingHeading top={titleTop} title="Let's Cook It!" />
    <form className='auth__form' onSubmit={onSubmit}>
      {children}
      <PrimaryButton type='submit' text={buttonText} />
    </form>
    <p>
      {navigateText + " "}
      <span>{navigateActionText}</span>
    </p>
  </div>
);

export default AuthLayout;
