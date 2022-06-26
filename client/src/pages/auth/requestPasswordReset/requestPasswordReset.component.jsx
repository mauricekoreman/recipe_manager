import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/input/input.component";
import PrimaryButton from "../../../components/primary-button/primary-button.component";

import { requestPasswordReset, reset } from "../../../redux/authSlice";

import "./requestPasswordReset.styles.scss";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, message, isSuccess, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("An email has been sent to you!");
    }

    dispatch(reset());
  }, [isError, isSuccess]);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function submitRequestPassword(e) {
    e.preventDefault();

    dispatch(requestPasswordReset(email));
  }

  return (
    <main className='requestPasswordReset__container'>
      <div className='requestPasswordReset__heading'>
        <FiArrowLeft onClick={() => navigate(-1)} />
        <h1>Request password reset</h1>
      </div>
      <form onSubmit={submitRequestPassword}>
        <Input
          label='Current user email'
          placeholder='Email'
          type='email'
          required
          onChange={handleChange}
        />
        <PrimaryButton loading={isLoading} text={"Send reset link"} type='submit' />
      </form>
    </main>
  );
};

export default RequestPasswordReset;
