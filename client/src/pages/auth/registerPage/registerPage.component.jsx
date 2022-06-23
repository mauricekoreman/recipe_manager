import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../../../redux/authSlice";

import Input from "../../../components/input/input.component";
import AuthLayout from "../auth-layout/auth-layout.component";

import "./registerPage.styles.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <AuthLayout
      titleTop={"Register"}
      buttonText={"Register"}
      navigateActionText={"Login now!"}
      navigateText={"Already have an account?"}
      onSubmit={onSubmit}
      navigateTo={"/login"}
    >
      <Input name='name' label='Name' placeholder='John Doe' type='text' onChange={onChange} />
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
      <Input
        name='password2'
        label='Confirm password'
        placeholder='******'
        type='password'
        onChange={onChange}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
