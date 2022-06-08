import "./settingspage.styles.scss";
import { useDispatch } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import Input from "../../components/input/input.component";
import TextButton from "../../components/text-button/text-button.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";

import { logout } from "../../redux/authSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <FiArrowLeft />
      <h1>Settings</h1>

      <Input label={"Name"} type='text' />
      <Input label={"Email"} type='email' />
      <TextButton text={"Change password"} />
      <TextButton text={"Logout"} onClick={() => dispatch(logout())} />
      <PrimaryButton text={"Save changes"} />
    </div>
  );
};

export default SettingsPage;
