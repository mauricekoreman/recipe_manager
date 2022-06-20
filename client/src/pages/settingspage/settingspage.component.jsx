import "./settingspage.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiKey, FiLogOut } from "react-icons/fi";
import Input from "../../components/input/input.component";
import TextButton from "../../components/text-button/text-button.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";

import { logout, updateUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    username: user?.name,
    email: user?.email,
  });

  function onUserDataChange(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function saveChanges(e) {
    e.preventDefault();

    dispatch(updateUser(userData));
  }

  function changePassword() {
    console.log("changing password!");
  }

  return (
    <main className='settings__container'>
      <div className='settings__heading'>
        <FiArrowLeft onClick={() => navigate(-1)} />
        <h1>Settings</h1>
      </div>

      <form onSubmit={saveChanges}>
        <Input
          required
          name={"name"}
          label={"Name"}
          type='text'
          defaultValue={user?.name}
          onChange={onUserDataChange}
        />
        <Input
          required
          name={"email"}
          label={"Email"}
          type='email'
          defaultValue={user?.email}
          onChange={onUserDataChange}
        />
        <TextButton
          icon={<FiKey />}
          text={"Change password"}
          className={"settings__btn settings__btn--password"}
          onClick={changePassword}
        />
        <TextButton
          icon={<FiLogOut />}
          text={"Logout"}
          className={"settings__btn settings__btn--logout"}
          onClick={() => dispatch(logout())}
        />
        <PrimaryButton type='submit' text={"Save changes"} />
      </form>
    </main>
  );
};

export default SettingsPage;
