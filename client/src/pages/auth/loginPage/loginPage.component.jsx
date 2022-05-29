import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset } from "../../../redux/authSlice";

import Input from "../../../components/input/input.component";
import AuthLayout from "../auth-layout/auth-layout.component";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  function onSubmit(e) {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <AuthLayout
      titleTop={"Login"}
      buttonText={"Login"}
      navigateText={"Don't have an account?"}
      navigateActionText={"Register now!"}
      onSubmit={onSubmit}
    >
      <Input
        name='email'
        label='Email'
        placeholder='example@gmail.com'
        type='email'
        onChange={onChange}
      />
      <Input
        name='password'
        label='Password'
        placeholder='******'
        type='password'
        onChange={onChange}
      />
    </AuthLayout>
  );
};

export default LoginPage;
