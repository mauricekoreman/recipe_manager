import "./settingspage.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiKey, FiLogOut } from "react-icons/fi";
import Input from "../../components/input/input.component";
import TextButton from "../../components/text-button/text-button.component";
import PrimaryButton from "../../components/primary-button/primary-button.component";

import { logout, updateUser, reset } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/modal.component";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.name,
    oldEmail: user?.email,
    newEmail: user?.email,
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Changes saved!");
      setShowModal(false);
    }

    dispatch(reset());
  }, [isError, isSuccess]);

  function onUserDataChange(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function submitUserChanges(e) {
    e.preventDefault();

    dispatch(updateUser(userData));
  }

  return (
    <main className='settings__container'>
      <div className='settings__heading'>
        <FiArrowLeft onClick={() => navigate(-1)} />
        <h1>Settings</h1>
      </div>

      <form onSubmit={submitUserChanges}>
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
          name={"newEmail"}
          label={"Email"}
          type='email'
          defaultValue={user?.email}
          onChange={onUserDataChange}
        />
        <TextButton
          icon={<FiKey />}
          text={"Change password"}
          className={"settings__btn settings__btn--password"}
          onClick={() => navigate("/password/requestReset")}
          loading={isLoading}
        />
        <TextButton
          icon={<FiLogOut />}
          text={"Logout"}
          className={"settings__btn settings__btn--logout"}
          onClick={() => dispatch(logout())}
          loading={isLoading}
        />
        <PrimaryButton
          type='button'
          loading={isLoading}
          onClick={() => setShowModal(true)}
          text={"Save changes"}
        />
        {showModal && (
          <Modal
            backdropClick={() => setShowModal(false)}
            header='Please confirm your changes with your password'
          >
            <Input
              autoFocus
              name='password'
              type='password'
              label='Your password'
              onChange={onUserDataChange}
              required
            />
            <TextButton
              text='Confirm'
              type='submit'
              className='confirm-modal-btn'
              onClick={submitUserChanges}
              loading={isLoading}
            />
          </Modal>
        )}
      </form>
    </main>
  );
};

export default SettingsPage;
