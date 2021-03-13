import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import * as User from "../services/user";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const res = await User.login(this.state.data);
    console.log(res);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", this.state.data.username);
      window.location.replace("/");
    } else {
      toast.error(res.data.message);
    }
  };
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
