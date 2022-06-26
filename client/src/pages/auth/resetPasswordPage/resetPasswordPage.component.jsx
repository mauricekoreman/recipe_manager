import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../../components/input/input.component";
import PrimaryButton from "../../../components/primary-button/primary-button.component";

import { reset, resetPassword } from "../../../redux/authSlice";

import "./resetPasswordPage.styles.scss";

const ResetPasswordPage = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, message, isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, message]);

  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  function handleChange(e) {
    setPassword(e.target.value);
  }

  function submitResetPassword(e) {
    e.preventDefault();

    const passwordData = {
      userId,
      token,
      password,
    };

    dispatch(resetPassword(passwordData));
  }

  return (
    <main className={"resetPassword__container"}>
      <h1 className='resetPassword__heading'>Reset your password!</h1>
      <form onSubmit={submitResetPassword}>
        <Input
          required
          label={"New password"}
          type='password'
          placeholder='******'
          onChange={handleChange}
        />
        <PrimaryButton loading={isLoading} type='submit' text={"Reset password"} />
      </form>
    </main>
  );
};

export default ResetPasswordPage;
