import React from "react";
import { useForm } from "react-hook-form";
import { StyledForm, StyledLogin } from "./Styles";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <StyledLogin>
      Welcome back, please log in to chat with me!
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="First name" />
        <input {...register("password")} placeholder="Last name" />

        <input type="submit" />
      </StyledForm>
    </StyledLogin>
  );
};

export default Login;
