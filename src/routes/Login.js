import React, { useState, FormEvent, Dispatch } from "react";
import {toast} from 'react-toastify';
import TextInput from "../common/components/TextInput";
import { Link } from "react-router-dom"; 
import loginImg from "../assets/images/login.jpg";
import logo from "../assets/images/logo.svg";
import "../styles/login.css";
import "../styles/login.css.map";
import "../styles/login.scss";
import { ChangeHistory } from "@material-ui/icons";
import {login} from "../services/login"

import {
  useHistory 
 } from "react-router-dom";
const Login = () => {
  const [formState, setFormState] = useState({
    username: { error: "", value: "" },
    password: { error: "", value: "" }
  });
  const [islogin, setLogin] = React.useState(true);
 let history = useHistory();

  function hasFormValueChanged(model) {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e) {
    // history.push("/user");

    console.log("onsbmit called",formState.username.value,formState.password.value)
    e.preventDefault();
    if(isFormInvalid()) { return; }
    else {
      if(formState.username.value == 'admin' && formState.password.value == 'pas'){
        console.log("correct")
     
      }
      else{
        toast.error('Usern  ame or password incorrect', 
        {position: toast.POSITION.BOTTOM_CENTER})
      }
    }
  }

  function submit(e) {
    console.log("onsbmit called",formState.username.value,formState.password.value)
    e.preventDefault();
    if(isFormInvalid()) { return; }
    else {

      let body ={
        "username":formState.username.value,
        "password":formState.password.value
      }
      login(body)
      .then((response) => {
        console.log("response",response)
         if(response && response.error ){
          toast.error('Username or password incorrect', 
          {position: toast.POSITION.BOTTOM_CENTER})
         }
      else {
        if(response?.data?.id) {
          localStorage.setItem('token',response?.data?.id)
          localStorage.setItem('userId',response?.data?.userId)
          localStorage.setItem('fname',response?.data?.user?.fName)

          history.push("/user");
        }
        else {
           toast.error('Something went wrong!', 
          {position: toast.POSITION.BOTTOM_CENTER})
        }
       
      }
     })
    }
  }

 
  function isFormInvalid() {
    return (formState.username.error || formState.password.error
      || !formState.username.value || !formState.password.value);
  }

  function getDisabledClass() {
    let isError = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function gotoSignUp(){
  history.push("/signup");
  }
  return (
    <div  class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">

        <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
          <img src={loginImg} class="login-card-img" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
              <img src={logo} class="logo" />
              </div>
              <p class="login-card-description">Sign into your account</p>
                 <form onSubmit={submit}>
                 <TextInput id="input_username"
                  field="username"
                  value={formState.username.value}
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={100}
                  label="Username"
                  placeholder="Username" />
                  <div className="form-group">
                    <TextInput id="input_password"
                      field="password"
                      value={formState.password.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      maxLength={100}
                      type="password"
                      label="Password"
                      placeholder="Password" />
                  </div>
                 
                  <button
                   name="login" id="login"
                    className={`btn btn-block login-btn mb-4`}
                    type="submit">
                    Login
                   </button>
                </form>
                {/* <a href="#!" class="forgot-password-link">Forgot password?</a> */}
                <p class="login-card-footer-text">Don't have an account? <a href='javascript:void(0)' onClick={()=> gotoSignUp()} href="#!" class="text-reset">Register here</a></p>
                <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
            </div>
          </div>
        </div>
      </div>
       
    </div>
    </div>
  );
};

export default Login;
